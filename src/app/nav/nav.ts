import { Component } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";


@Component({
    selector: 'fwdl-nav',
    templateUrl: 'nav.html',
    styleUrl: 'nav.css',
    imports: [RouterLink, RouterLinkActive]
})
export class Nav{

}