import { Component, OnInit, SimpleChanges, ViewChild, Output, Input, EventEmitter, forwardRef } from '@angular/core';
import { ReplaySubject, Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

const UPLOAD_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TnFileUploadComponent),
  multi: true,
};
@Component({
  selector: 'tn-file-upload',
  templateUrl: './tn-file-upload.component.html',
  styleUrls: ['./tn-file-upload.component.css'],
  providers: [UPLOAD_VALUE_ACCESSOR]
})
export class TnFileUploadComponent implements OnInit, ControlValueAccessor {

  @Input('multiple') multiple: Boolean = false;
  @Input('accept') accept: String = '';
  @Input('maxFileCount') maxFileCount: Number = 1;
  @Input('displayfile') displayfile: Boolean = true;
  @Input('displayname') displayname: Boolean = true;
  @Input('displaysize') displaysize: Boolean = true;
  @Input('hidden') hidden: Boolean = false;
  @Input('inputStyleForEditor') inputStyleForEditor: Boolean = false;

  @Input('showRemoveAllBtn') showRemoveAllBtn: Boolean = true;
  @Input('showCustomRemoveButton') showCustomRemoveButton: Boolean = true;
  @Input('restrictSize') restrictSize: number = 0;

  @ViewChild('tnFileUploader') tnFileUploader: any;

  msg: String = '';
  files: any[] = [];
  images: any[] = [];
  pdfPath: String = '../../../../assets/images/pdf.png';
  showSpinner: boolean = false;

  constructor(
    private sanitizer: DomSanitizer
  ) {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges', changes)
    if (changes['clearFieldAfterCustomUploading'] && changes['clearFieldAfterCustomUploading'].currentValue) {
      this.tnRemoveAll();
    } else {
      if (changes['multiple'] && changes['multiple'].currentValue && this.maxFileCount == 1) {
        this.maxFileCount = 5;
      }
    }
  }

  onChange = (change: any) => {
    console.log(change)
  };
  onTouched = () => { };
  value: any = '';

  writeValue(value: any): void {
    console.log('writeval', value);
    this.value = value || '';
    this.displayname = false;
    this.displaysize = false;
    if (typeof this.value == "string" && this.value) {
      this.images = [{ url: this.value }];
      this.files = [];
    } else if (Array.isArray(this.value) && this.value.length > 0) {
      this.images = [];
      this.files = [];
      Array.from(this.value).map(img => {
        this.images.push({ url: img });
      })
    }
  }

  pushChanges(value: any) {
    console.log('pushChanges', value)
    this.onChange(value);
  }

  registerOnChange(fn: (_: any) => {}): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => {}): void { this.onTouched = fn; }

  setDisabledState(isDisabled: boolean): void {
  }

  tnImportFile(e) {
    this.msg = '';
    let eFiles = e.target || e.srcElement;
    let new_files: Promise<any>[] = [];
    if (eFiles.files && eFiles.files.length <= this.maxFileCount) {
      this.showSpinner = true;
      this.files = Array.from(eFiles.files);
      this.images = [];
      new_files = this.files.map((item, i) => {
        return this.readFile(item);
      });
      Promise.all(new_files)
        .then(res => {
          this.files = [];
          res.map((val) => {
            this.images.push(val.obj);
            this.files.push(val.fileToRead)
          })
          this.value = ''
          if (this.multiple) {
            this.onChange(this.files);
          } else {
            this.onChange(this.files[0]);
          }
          this.showSpinner = false;

          // this.tnCustomGetFile.emit(files);
        })
        .catch(er => {
          this.msg = er;
          this.tnRemoveAll();
          this.showSpinner = false;
          console.log("err", er)
        })
    } else {
      this.tnRemoveAll();
      this.msg = 'Cannot be more than ' + this.maxFileCount + ' files. Change [maxFileCount] property';
    }
  }

  private readFile(fileToRead: File): Promise<any> {
    return new Promise((resolve, reject) => {
      let fileReader = new FileReader();
      fileReader.onload = event => {
        console.log('readFile', fileToRead)
        if ((this.restrictSize && (fileToRead.size / Math.pow(1024, 2)) >= this.restrictSize) || !this.restrictSize) {
          let ext = fileToRead.type.indexOf('/') != -1 ? fileToRead.type.split('/')[1] : '';
          let preext = fileToRead.type.indexOf('/') != -1 ? fileToRead.type.split('/')[0] : '';
          let obj = {
            url: fileReader.result,
            name: fileToRead.name,
            size: fileToRead.size,
            status: '',
            type: fileToRead.type,
            ext: ext,
            preExt: preext
          }
          return resolve({ fileToRead, obj });
        } else {
          return reject('File size should be more than ' + this.restrictSize + ' MB');
        }
      }
      fileReader.readAsDataURL(fileToRead);
    })
  }

  private tnRemoveAll() {
    this.files = [];
    this.tnFileUploader.nativeElement.value = "";
    this.msg = '';
    this.value = ''
    if (this.multiple)
      this.onChange([])
    else
      this.onChange('')
    // this.tnCustomGetFile.emit(this.files)
  }

  private tnRemove(index) {
    if (!isNaN(index) && this.files.length > 0 && index < this.files.length) {
      this.files.splice(index, 1);
      this.images.splice(index, 1);
      if (!this.restrictSize) {
        if (this.files.length == 0) { this.tnRemoveAll(); }
        else {
          this.onChange(this.files)
        }
        // this.tnCustomGetFile.emit(this.files)
      }
    } else if (typeof index == "number" && index > -1 && this.images.length) {
      this.images.splice(index, 1);
      if (this.images.length == 0) {
        this.tnRemoveAll();
      } else {
        this.onChange(this.images);
      }
    }
  }
}
