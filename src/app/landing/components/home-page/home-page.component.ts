import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { log } from 'console';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { MoviesService } from 'src/app/dashboard/movies/movies.service';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  movies:any
  filteredMovies:any
  searchTerm: FormControl = new FormControl();
  filteredMoviesList: any;
  constructor(private movieService: MoviesService) { }

  ngOnInit(): void {
    
    this.filteredMovies = this.movieService.getMovies()
    this.searchTerm.valueChanges.pipe(
      debounceTime(300), 
      distinctUntilChanged(),
      switchMap(term => this.searchMovies(term)) 
    ).subscribe(filteredMovies => {
      this.filteredMovies = filteredMovies;
    });
  }
  searchMovies(term: string) {
   
    
    if (!term.trim()) {
      return [this.filteredMovies];
    }
   
    console.log(this.filteredMovies);
    
    return [this.filteredMovies.filter((Movie:any) =>
      (Movie.title && Movie.title.toLowerCase().includes(term.toLowerCase()))||
      (Movie.description && Movie.description.toLowerCase().includes(term.toLowerCase()))
    )];
  }
}
