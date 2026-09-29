import { Component, signal } from '@angular/core';
import { Contactservice } from '../../../Services/api/contactservice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  contactData: any;
  items = signal<any[]>([]);
  total_rows: number = 0;

  params = {
    page: 1,
    pagesize: 10,
    search: '',
    sortColumn: 'id',
    sortDirection: 'desc',
  };

  constructor(
    private router: Router,
    private contactService: Contactservice,
  ) {}
  ngOnInit(): any {
    this.GetPaginatedContact();
    // this.GetContactById();
  }

  GetContactById() {
    this.contactService.GetContactById(1).subscribe((response) => {
      console.log('GetcontactById:', response);

      if (response && response.isSuccess) {
        this.contactData = response.result;
        console.log('contactData', this.contactData);
      }
    });
  }

  GetPaginatedContact() {
    try {
      const paginationParam = {
        page: this.params.page,
        pageSize: this.params.pagesize,
        searchTerm: this.params.search,
        sortColumn: this.params.sortColumn,
        sortDirection: this.params.sortDirection,
      };

      this.contactService.GetPaginatedContact(paginationParam).subscribe((data) => {
        console.log('GetPaginatedContact response:', data);
        this.items.set(data.result);
        this.total_rows = data.totalCount;
        console.log('items:', this.items());
      });
    } catch (error) {
      console.error('Error fetching paginated contact:', error);
    }
  }

  addNew() {
    this.router.navigate(['/add']);
  }
}
