import {Component, EventEmitter, CORE_DIRECTIVES} from 'angular2/angular2';
import {AceEditor} from './aceEditor';

//declare the marked function as magical
declare var marked:(string) => any;

/**
 * Editable markdown component.
 *
 * ## Example
 *
 * Add to your html template:
 *
 * ```
 * <markdown-editor
 * (save)="updatedText($event)"
 * [initial-text]="markdownContent">
 * </markdown-editor>
 * ```
 *
 * Remember to include the `Markdown` **directive** in your `@View` annotation:
 *
 * ```directives: [Markdown]```
 *
 * ## Example
 *
 * You can also control the component with external ui:
 *
 * ```
 * <button (click)="md.editMode = true">Custom Edit Button</button>
 * <markdown-editor [initial-text]="welcome" [show-edit-button]="false" edit-mode="true" #md></markdown-editor>
 * ```
 *
 * ## Selectors
 *
 * `markdown-editor`
 *
 * ## Inputs
 *
 * - `editable` - default to true. If false; only render markdown - don't allow user to edit it.
 * - `editMode` - defaults to false. Show the editor or the rendered markdown.
 * - `showEditButton` - defaults to true. Should this component render an edit button.
 *
 * ### Events (Outputs)
 *
 * The two events that the `markdown-editor` component emits:
 *
 * - `save`
 * - `change`
 *
 * Note both events include the entire markdown document.
 *
 * ## Installation
 *
 * This component relies on two libraries:
 * - `marked` for rendering markdown as html
 * - and `ace editor` for editing markdown
 *
 *
 * For now we can include the ace library directly:
 *
 * ```
 * <script src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.1.9/ace.js"></script>
 * <script src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.1.9/mode-markdown.js"></script>
 * ```
 *
 * The `marked` library can be added using npm.
 **/
@Component({
    selector: 'markdown-editor',
    inputs: [
        'initialText',
        'editable',
        'showEditButton'
    ],
    outputs: [
        'saveHandler: save',
        'changeHandler: change'
    ],
    templateUrl: './components/markdown/markdown.html',
    directives: [CORE_DIRECTIVES, AceEditor],
    styles: [`
    .btmd {
      margin-top: 5px;
      margin-bottom: 5px;
      padding: 2px;
    }
  `]
})
export class Markdown {
    editable:boolean = true;
    editMode:boolean = false;
    showEditButton:boolean = true;
    showSaveButton:boolean = true;

    unsavedChanges: boolean = false;

    original: string;
    modified: string;
    markdown: string;   // The one we show in the editor

    rendered: string;

    saveHandler:EventEmitter = new EventEmitter();
    changeHandler:EventEmitter = new EventEmitter();

    edit() {
        this.editMode = true;
    }

    save() {
        this.unsavedChanges = false;
        this.saveHandler.next(this.modified);
        this.editMode = false;
    }

    preview() {

        // Save the modified text as `markdown`
        // so if we recreate the editor we have the correct text
        this.markdown = this.modified;

        if(this.modified !== this.original) {
            this.unsavedChanges = true;
        }
        this.editMode = false;
    }

    cancel() {
        // Load the original text back
        this.markdown = this.original;
        this.rendered = marked(this.original);

        this.unsavedChanges = false;
        this.editMode = false;
    }

    set initialText(text: string){
        console.log("Setting initial text for bt-markdown");
        this.original = text;
        this.markdown = text;
        this.rendered = marked(text);
    }

    contentUpdate(event) {
        //Note this also gets called as content is added
        this.rendered = marked(event);

        this.modified = event;

        // Pass the changed document up
        this.changeHandler.next(event);
    }
}
