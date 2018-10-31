import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  @ViewChild('richTextfield') richTextfield:ElementRef
  @ViewChild('toolbar') toolbar:ElementRef
  
  constructor(private rend: Renderer2) { }


  ngOnInit(){
    this.initiateEditor()
  }

  initiateEditor(){
    // Create a toolbar
    const createToolbar = this.rend.createElement('div')
    this.rend.setAttribute(createToolbar, 'class', 'toolbar')

    const colorPalette = ['000000', 'FF9966', '6699FF', '99FF66', 'CC0000', '00CC00', '0000CC', '333333', '0066FF', 'FFFFFF'];
    const Icontrols = [
      {command: 'undo', icon:'fa fa-undo'},
      {command: 'redo', icon: 'fa fa-redo'},
      {command: 'bold', icon: 'fa fa-bold'},
      {command: 'italic', icon:'fa fa-italic'},
      {command: 'underline', icon: 'fa fa-underline'},
      {command: 'strikeThrough', icon: 'fa fa-strikethrough'},
      {command: 'justifyLeft', icon: 'fa fa-align-left'},
      {command: 'justifyCenter', icon:'fa fa-align-center'},
      {command: 'justifyRight', icon: 'fa fa-align-right'},
      {command: 'justifyFull', icon: 'fa fa-align-justify'},
      {command: 'indent', icon: 'fa fa-indent'},
      {command: 'outdent', icon: 'fa fa-outdent'},
      {command: 'insertUnorderedList', icon: 'fa fa-list-ul'},
      {command: 'insertOrderedList', icon: 'fa fa-list-ol'},
      {command: 'createlink', icon: 'fa fa-link'},
      {command: 'unlink', icon: 'fa fa-unlink'},
      {command: 'insertimage', icon:'fa fa-image'},
      {command: 'subscript', icon:'fa fa-subscript'},
      {command: 'superscript', icon: 'fa fa-superscript'},
      {command: 'copy', icon: 'fa fa-copy'},
      {command: 'paste', icon: 'fa fa-paste'}
    ]

    const forePalette = this.rend.createElement('div')
    const backPalette = this.rend.createElement('div')
    this.rend.setAttribute(forePalette, 'class', 'fore-palette')
    this.rend.setAttribute(backPalette, 'class', 'back-palette')
    

    for(let i = 0; i < colorPalette.length; i++){
      const colorATag = this.rend.createElement('a')
      this.rend.setAttribute(colorATag,'href', '#')
      this.rend.setAttribute(colorATag, 'data-command','forecolor')
      this.rend.setAttribute(colorATag,'class','palette-item')
      this.rend.setAttribute(colorATag, 'style', `background-color:#${colorPalette[i]};`)
      this.rend.setAttribute(colorATag, 'data-value', `#${colorPalette[i]}`)

      this.rend.appendChild(backPalette, colorATag)
      this.rend.appendChild(forePalette, colorATag)
    }

    // Create Toolbar Buttons

    for(let i = 0; i < Icontrols.length; i++){
      const createAControl = this.rend.createElement('a')
      this.rend.setAttribute(createAControl, 'href', '#')
      this.rend.setAttribute(createAControl, 'title', `${Icontrols[i].command}`)
      this.rend.setAttribute(createAControl, 'data-command', `${Icontrols[i].command}`)
  
      const icon = this.rend.createElement('i')
      this.rend.setAttribute(icon, 'class',`${Icontrols[i].icon}`)
  
      this.rend.appendChild(createAControl, icon)

      this.rend.listen(createAControl, 'click',()=>{
        this.TheCommand(Icontrols[i].command)
      })

      this.rend.appendChild(createToolbar, createAControl)

      console.log(createAControl)
    }

    this.rend.appendChild(this.toolbar.nativeElement,createToolbar)

    console.log(createToolbar)
  }

  TheCommand(id){
    if(id === 'createlink' || id === 'insertimage'){
      const url = prompt('Enter the link here: ','http:\/\/'); 
      document.execCommand(id, false, url);
    }
    else if(id === 'forecolor' || id === 'backcolor'){
      // document.execCommand(id, false, document.getele'value'));
      console.log('Hello World')
    }
    else{
      document.execCommand(id, false, null);
    }
  }



}
