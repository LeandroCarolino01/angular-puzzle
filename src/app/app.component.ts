import { Component } from "@angular/core";
import { TileComponent } from "./components/tile/tile.component";
import { Tile } from "./models/tile";
import { backgrounds } from "./data/backgrounds";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  // An array of style objects
  backgrounds = backgrounds;

  // Tile objects data
  tiles: Tile[] = [
    // Currentstyle is dynamic!
    // On tile "swap" we assign a new style object
    { id: 0, currentStyle: 0 },
    { id: 1, currentStyle: 1 },
    { id: 2, currentStyle: 2 },
    { id: 3, currentStyle: 3 },
    { id: 4, currentStyle: 4 },
    { id: 5, currentStyle: 5 },
    { id: 6, currentStyle: 6 },
    { id: 7, currentStyle: 7 },
    { id: 8, currentStyle: 8 }
  ];

  /**
   * Assign random style objects to the tiles, always keep tile 8 empty at the start
   */
  shuffle(): void {
    // Initially we sort and assign all 8 tiles their styles
    // in order to have the bottom left tile white (default)
    const init = [0,1,2,3,4,5,6,7,8]
    init.map((num, i) => this.tiles[i].currentStyle = num)

    // Next we assign 7 random style objects to other tiles
    const nums = [0,1,2,3,4,5,6,7]
    const shuffled = nums.sort(() => Math.random() - 0.5)
    shuffled.map((num, i) => this.tiles[i].currentStyle = num)
  }

  
  /**
   * @param  {number} id of the tile we clicked on
   * first check if the clicked tile is not currently empty
   * and is adjacent to the currently empty
   * if yes, swap their styles
   */
  swapTiles(id: number): void {
    if ((this.currentEmpty().id !== id) && this.isAjacent(id)) {
      const clicked = this.tiles.find(tile => tile.id === id);
      const temp = clicked.currentStyle
      this.currentEmpty().currentStyle = temp
      clicked.currentStyle = 8
    }
  }
  /**
   * Find the tile that currently has empty class assigned
   * @return {Tile} id of the tile we clicked on
   */
  currentEmpty(): Tile {
    return this.tiles.find(tile => tile.currentStyle === 8);
  }
  /**
   * @param  {number} id of the clicked tile
   * check if the clicked tile has the empty one in its neighbours array
   * @returns boolean
   */
  isAjacent(id: number): boolean {
    let neighbours: Array<number>;
    switch(id) {
      case 0:
        neighbours = [1, 3]
        break;
      case 1:
        neighbours = [0, 2, 4]
        break;
      case 2:
        neighbours = [1, 5]
        break;
      case 3:
        neighbours = [0, 4, 6]
        break;
      case 4:
        neighbours = [1, 3, 5, 7]
        break;
      case 5:
        neighbours = [2, 4, 8]
        break;
      case 6:
        neighbours = [3, 7]
        break;
      case 7:
        neighbours = [6, 4, 8]
        break;
      case 8:
        neighbours = [5, 7]
        break;
      default: neighbours = []
    }

    return neighbours.includes(this.currentEmpty().id)
  }
}
