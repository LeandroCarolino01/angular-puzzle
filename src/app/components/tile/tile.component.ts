import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Tile } from "../../models/tile";

@Component({
  selector: "app-tile",
  templateUrl: "./tile.component.html",
  styleUrls: ["./tile.component.css"]
})
export class TileComponent {
  @Input() tile: Tile;
  @Input() className: string;
  @Output() swap = new EventEmitter<number>();

  clickTile(id: number) {
    this.swap.emit(id);
  }
}
