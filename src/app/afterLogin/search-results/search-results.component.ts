import { isArray } from 'util';
import { Component, OnInit, OnChanges } from '@angular/core';
import { CrudService } from '../../crud.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { fadeInOutAnimation } from 'src/app/ngifAnimation';
import * as _ from 'lodash';
declare var $;
@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css'],
  animations: [ fadeInOutAnimation ]
})
export class SearchResultsComponent implements OnInit {
  
  public spinner:any  =false;
  public results: Array<any> = [];
  public users: Array<any> = [];
  public searchText: any = '';
  public isLoggedIN: any = false
  public resultType:any = 'video';
  public minDecision: any;
  public queryParams:any = {'updatedAt':'','interactivity':'','minDecision':'','maxDecision':'','minOutcome':'','maxOutcome':'','feature':''}
  public maxDecision: any;
  public minOutcome: any;
  public maxOutcome: any;
  public categoriesSelected:any = []
  public categories: Array<any> = [];
  public features: Array<string> = [];
  val:any = 'recent';
  constructor(
    public crudService: CrudService,
    public toastr: ToastrService,
    public router: Router,
    public activeRoute: ActivatedRoute) {
      this.activeRoute.queryParams.subscribe(params => {
        if (window.localStorage.getItem('token')) {
     
        } else {
          if (window.localStorage.getItem('anonymousToken')) {
          } else {
            this.getAnonymousUser();
          }
        }
        
        this.searchText = params.search;
        this.getSearchResults();
        if(window.localStorage.getItem('token') == null && window.localStorage.getItem('token') == undefined){
          this.isLoggedIN = false;
          //$('.search-dropdown').hide();
        }
        else{
          this.isLoggedIN = true
        }
      });
    }


    showCategory(id: any) {

      this.router.navigate(['category'], { queryParams: { category: id } });
    
    }
    

  getAnonymousUser() {
    this.crudService.getAnonymousUser().subscribe(
      success => {
        if (window.localStorage.getItem('anonymousToken')) {
        } else {
          window.localStorage.setItem('anonymousToken', success.data.token);
        }
      }
    );
  }

  ngOnInit() {
    //this.getCategories();
    
  }

  getCategories() {
    this.crudService.fetchCategories().subscribe(
      success => {
        this.categories = success.data.categories;
      });
  }

  getSearchResults() {
    this.spinner = true;
    this.crudService.simpleVideoSearch(this.searchText).subscribe(
      success => {
        if (!_.isEmpty(success.data.searchdata)) {
          if (!_.isEmpty(success.data.searchdata[0].userInfo) && !_.isEmpty(success.data.searchdata[0].videoInfo)) {
            this.results = success.data.searchdata;
            this.results = this.results.reverse();
          }
        }

        if (!_.isEmpty(success.data.searchbyuser)) {
          this.users  = success.data.searchbyuser;
        }
        // this.users  = success.data.searchbyuser;
        // this.results = success.data.searchdata;
        // this.results = this.results.reverse();
        this.getCategories();
        this.spinner = false;
      });
  }

  viewuser(id:any)
  {
    this.router.navigate(['public-profile'], { queryParams: { user: id } });
  }

  applyUploadDateFilter(event: any) {
   
    this.queryParams.updatedAt = event.target.value ;
    this.spinner = true;
    this.filterData();
    
  }

  

  applyInteractivityFilter(event: any) {
    
    this.queryParams.interactivity = event.target.value;
    this.spinner = true;
    this.filterData();
   
  }

  applyDecisionFilter(event: any) {
   
    this.queryParams.minDecision = this.minDecision;
    this.queryParams.maxDecision = this.maxDecision;
    this.spinner = true;
    this.filterData();
    
  }

  applyOutcomeFilter(event: any) {
    
   
    this.queryParams.minOutcome = this.minOutcome;
    this.queryParams.maxOutcome = this.maxOutcome;
    this.spinner = true;
    this.filterData();
  }

  applyFeatureFilter(event: any) {
   
    if(event.target.checked)
    {
      this.categoriesSelected.push(event.target.value)
    }
    else
    {
      let index=0;
      for(let i of this.categoriesSelected)
      {
        if(event.target.value == i)
        {
          this.categoriesSelected.splice(index,1)
          break;
        }
        index++
      }
    }
    // this.categoriesSelected
    // this.queryParams.feature = this.queryParams.feature +','+ event.target.value;
    this.spinner = true;
    this.filterData();
     
  }

  showFilters() {
    $('.filters-div').toggle();
  }

  viewVides(id:any)
  {
      this.router.navigate(['videos'], { queryParams: { video: id } });

  }

  filterData()
  {
    this.results = [];
    let param:any='filter=true&updatedAt='+this.queryParams.updatedAt+'&interactivity='+this.queryParams.interactivity+'&minDecision='+this.queryParams.minDecision+'&maxDecision='+this.queryParams.maxDecision+'&minOutcome='+this.queryParams.minOutcome+'&maxOutcome='+this.queryParams.maxOutcome+'&feature='+this.categoriesSelected.join(','); 
    this.crudService.searchVideo(this.searchText, param).subscribe(
      success=> {
        console.log(success.data)
           // this.users  = success.data.searchbyuser;
             this.results = success.data;
             this.results = this.results.reverse();
             this.spinner = false;
       
      }, 
      error => {

      });
  }


  changeFilter(val:any){
    if(val =='recent')
    {
      this.results.sort(function (a, b) {
        if (a.videoInfo.publishTime > b.videoInfo.publishTime) {
          return -1;
        }
        return 1
      })
    }
   
    else
    {
      this.results.sort(function (a, b) {
        if (a.videoInfo.publishTime > b.videoInfo.publishTime) {
          return 1;
        }
        return -1
      })
    }
    
  }
  
}
