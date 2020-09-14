import { Pipe, PipeTransform } from '@angular/core';
import * as showdown from "showdown";

@Pipe({name: 'markdownTranslater'})
export class MarkdownPipe implements PipeTransform {
  transform(value: string): string {
    var converter = new showdown.Converter();
    return converter.makeHtml(value);
  }
}