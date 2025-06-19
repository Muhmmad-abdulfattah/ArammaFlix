import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Movies } from './Components/movies/movies';
import { Navbar } from './Components/navbar/navbar';
import { LanguageService } from './Services/language';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Movies, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'Task';
}
