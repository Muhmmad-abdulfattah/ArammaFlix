import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Movies } from './Components/movies/movies';
import { Navbar } from './Components/navbar/navbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Movies,Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'Task';
}
