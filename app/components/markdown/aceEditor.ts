import {ElementRef} from 'angular2/core';
import {Directive, EventEmitter} from 'angular2/angular2';


//declare the ace library as Magic;
declare var ace:any;

// Note the aceEditor doesn't have a template so is a Directive
@Directive({
    selector: '[ace-editor]',
    inputs: [
        'markdown'
    ],
    outputs: ['contentChange: change']
})
export class AceEditor {
    // http://ace.c9.io/#nav=api&api=editor
    editor;

    /** When the markdown content changes we broadcast the entire document. */
    contentChange: EventEmitter = new EventEmitter();

    constructor(elementRef: ElementRef) {
        // Note the constructor doesn't have access to any data from properties
        // We can instead use a setter

        // This is the <div ace-editor> root element
        // Ideally this wouldn't be required
        var el = elementRef.nativeElement;

        el.classList.add("editor");
        el.style.height = "250px";
        //el.style.width = "400px";

        this.editor = ace.edit(el);
        //this.editor.setTheme("ace/theme/monokai");
        this.editor.getSession().setMode("ace/mode/markdown");

        //this.editor.$blockScrolling = Infinity;

        this.editor.on("change", (e) => {
            // Discard the delta (e), and provide whole document
            this.contentChange.next(this.editor.getValue());
        });

    }

    set markdown(text){
        this.editor.setValue(text);
        this.editor.clearSelection();
        this.editor.focus();
    }


}
