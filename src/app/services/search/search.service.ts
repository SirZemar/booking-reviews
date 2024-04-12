import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class SearchService {
	private searchSubject = new BehaviorSubject<string>('');
	public search$: Observable<string> = this.searchSubject.asObservable();

	setSearchTerm(searchTerm: string): void {
		this.searchSubject.next(searchTerm);
	}

	unsubscribe() {
		this.searchSubject.unsubscribe();
	}
}
