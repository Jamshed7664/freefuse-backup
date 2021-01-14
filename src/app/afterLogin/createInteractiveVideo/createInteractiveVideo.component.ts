import { Component,EventEmitter, OnInit, AfterViewInit } from '@angular/core';
import { CrudService } from 'src/app/crud.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer } from '@angular/platform-browser';
import { MinuteSecondsPipe } from './../../pipeFormatSecond';
import { fadeInOutAnimation } from 'src/app/ngifAnimation';
declare var $;
declare var d3;

@Component({
  selector: 'createInteractiveVideoComponent',
  templateUrl: './createInteractiveVideo.component.html',
  styleUrls: ['./createInteractiveVideo.component.css'],
  animations: [ fadeInOutAnimation ]
})
export class CreateInteractiveVideoComponent implements OnInit, AfterViewInit {


freeTemplate:any
  constructor(public urlService: CrudService, public router: Router, public toastr: ToastrService, public sanitizer: DomSanitizer, public activatedRoute: ActivatedRoute) {

    this.activatedRoute.queryParams.subscribe(params => {
      console.log(params)
      if(params.freeTemp){
        this.freeTemplate=params.freeTemp;
      }else{
    this.createInteractiveVideoObj.currentObj.id = params.video;
      this.mainID = params.video
      }
  
    
      // logic after subscribing
    });

  }
  public uploadVideoObject:any = {spinner:false,allVideos:[],selectedVideos:[],format:'',url:'',isUploaded:false,duration:0,name:'',type:'',size:'',preSignedUrl:'',file:[],allUploadedVideo:[],allUrls:[],changeFilterUploadVideo:'recentFirst',changeFilterURL:'recentFirst',uploadPercentage:0, loadingVideo: false}
  public isUploaded:any = false;
  public allVideos:any = [];
  public selectedVideos:any = [];
  public allUploadedVideo:any = [];
  public uploadPercentage:any = 0;
  public spinner:any = false;
  public loadingVideo:any = false;
  public uploadedCount:any = 0;
  public finalCount:any = 0
  isTemplate:any =false;
  isOpen:any  = false;
  public changeFilterUploadVideoVal:any  = 'recentFirst';







  public item:any = ';'
  public contrubutors:any = [];
  public zoomRef:any = 1;
  public interval:any;
  public visRef:any;
  public createInteractiveVideoObj: any = { spinner: false, selectedType: '', selectedVideoCheck: false, interactiveStep: 'one', tree: '', root: '', duration: 750, diagonal: '', svg: '', i: 0, currentObj: {}, allVideos: [], allUploadedVideo: [], allUrls: [], changeFilterUploadVideo: 'recentFirst', changeFilterURL: 'recentFirst', selectedItem: '', query: '', interactiveVideo: [], finalObj: [], currentPlayingItem: {}, mainVideo: '', child: [], publish: false, currentNodeOption: '', preview :false}
  public isOpenCreateVideo:any = false;
  public OpenPopupAll: any = false;
  public availableCategory: any = []
  isShareOpen:any = false
  public createChoiceObj: any = { child: [], currentNo: 2, parent: '' }
  public mainID: any = ''
  public config1 = { search: true, height: 'auto', placeholder: 'Untitled 1', noResultsFound: 'No results found!', searchOnKey: 'name', searchPlaceholder: 'Search', displayKey: "name" }

  public config2 = { search: true, height: 'auto', placeholder: 'Untitled 2', noResultsFound: 'No results found!', searchOnKey: 'name', searchPlaceholder: 'Search', displayKey: "name" }
  public config3 = { search: true, height: 'auto', placeholder: 'Untitled 3', noResultsFound: 'No results found!', searchOnKey: 'name', searchPlaceholder: 'Search', displayKey: "name" }
  public config4 = { search: true, height: 'auto', placeholder: 'Untitled 4', noResultsFound: 'No results found!', searchOnKey: 'name', searchPlaceholder: 'Search', displayKey: "name" }
  public config5 = { search: true, height: 'auto', placeholder: 'Select Categories', noResultsFound: 'No results found!', searchPlaceholder: 'Search', }
  
  public followers: Array<any> = [];
  public following: Array<any> = [];

  public contributorId: any;
  public isChecked: boolean = false;
  public setFollowerCheck: boolean = false;
  zoom1:any
  public setFollowingCheck: boolean = false;
  readyToUpload:boolean=false;
  ngAfterViewInit() {

  }
  ngOnInit() {

    this.intialFunction('');
    this.getFollowersList();
  }
  uploadVideos(){
    this.readyToUpload=!this.readyToUpload;
  }
  intialFunction(p) {
    this.getCurrentWidth()
    let freeTemp =window.localStorage.getItem('freeTemp')
    this.createInteractiveVideoObj.allUploadedVideo = [];
    this.createInteractiveVideoObj.spinner = true;
    this.urlService.getUploadedVideo().subscribe(
      success => {
        console.log(success.data[0].poster)
        this.createInteractiveVideoObj.allVideos = success.data;
        console.log('Poster is',this.createInteractiveVideoObj.allVideos[0].poster)
        console.log('for tstng',this.freeTemplate);
        
        if(freeTemp){
          this.clickSelectVideo()
        }
        for (let i of this.createInteractiveVideoObj.allVideos) {

         
            i.URLName = i.name
              if(!!i.originalName)
              {
                i.name = i.originalName
              }          
                
           
            this.createInteractiveVideoObj.allUploadedVideo.push(i)
        }
        this.createInteractiveVideoObj.allUploadedVideo = this.createInteractiveVideoObj.allUploadedVideo.reverse();

        if (this.mainID) {

          this.urlService.getInteractiveVideo().subscribe(
            success => {
              // console.log('DATA: ', success.data);
              for (let i of success.data) {
                if (i._id == this.mainID) {
                  // console.log('Mathed: ', i._id);
                  this.createInteractiveVideoObj.currentObj = i;
                  this.createInteractiveVideoObj.mainVideo = i
                  this.item = this.createInteractiveVideoObj.mainVideo.poster;
                  this.createInteractiveVideoObj.currentPlayingItem = i
                  // this.createInteractiveVideoObj.currentPlayingItem = i
                  // this.createInteractiveVideoObj.currentObj.children = null;
                  this.callChild(p);
                  return;
                }
              }
              this.toastr.error('Invalid URL!');
              this.router.navigate(['create-interactive-video']);
              this.createInteractiveVideoObj.selectedVideoCheck = true;
              this.createInteractiveVideoObj.interactiveStep = 'one';
              this.createInteractiveVideoObj.spinner = false;
            });
        }

        else {
          this.createInteractiveVideoObj.spinner = false;
          this.createInteractiveVideoObj.selectedVideoCheck = true;
          // this.createInteractiveVideoObj.selectedVideoCheck= true;
          this.createInteractiveVideoObj.interactiveStep = 'one';
        }
        // $('input[name=uploadedVideo]:checked').removeAttr('checked');
        // $('input[name=uploadedVideo1]:checked').removeAttr('checked');
      },
      error => {
        this.createInteractiveVideoObj.spinner = false;

      })
  }
  footserSection:any;
  buttonView:any;
  zoomBtnPosition:any="0px"
  iconPosition:any="0px"
  hideShowFooter(){
    if( this.footserSection == 'none'){
      this.footserSection='block'
      this.zoomBtnPosition="63px"
      this.iconPosition="98px"
    }else{
      this.footserSection='none'
      this.zoomBtnPosition="0px"
      this.iconPosition="0px"

    }
  }

  getCurrentWidth(){
    let width = window.innerWidth;
    if(width < 991){
      this.footserSection='none';
      this.buttonView='block';
    }else{
      this.footserSection='block';
      this.buttonView='none';
      
    }
  }
  callChild(p) {
    this.urlService.getChildVideosAll(this.createInteractiveVideoObj.currentObj._id).subscribe(
      success => {

        let tree = [];
        if(!(!!this.createInteractiveVideoObj.currentObj.name))
        {
          this.createInteractiveVideoObj.currentObj.name = 'Add Video';
          this.createInteractiveVideoObj.currentObj.poster1 = 'assets/images/H-vidcam.svg'
          this.createInteractiveVideoObj.currentObj.basck = 'gt'
          this.createInteractiveVideoObj.currentObj.title = 'Add Video'
          this.createInteractiveVideoObj.currentObj.imvd = 'imvd'
        }
        else{
          this.createInteractiveVideoObj.currentObj.basck = 'videochart'
          this.createInteractiveVideoObj.currentObj.imvd = 'ncs'
        }
        this.createInteractiveVideoObj.currentObj.parentId = "0";
        tree.push(this.createInteractiveVideoObj.currentObj);
        for (let i of success.data) {
          // i.children = null;
          
          if(!(!!i.name))
          {
            i.name = 'Add Video';
            i.poster1 = 'assets/images/H-vidcam.svg'
            i.basck = 'gt'
            i.title = 'Add Video'
            i.imvd = 'imvd'
          }
          else{
            i.basck = 'videochart'
            i.imvd = 'ncs'
          }
          tree.push(i)
        }

        this.createInteractiveVideoObj.selectedVideoCheck = false;
        this.createInteractiveVideoObj.interactiveStep = 'three';
        this.createInteractiveVideoObj.spinner = false;
        this.createInteractiveVideoObj.finalObj = tree;
        this.createInteractiveVideoObj.currentPlayingItem = tree[0]
        this.createInteractiveVideoObj.currentObj.open = false;
         
      

        this.callTree(this.createNestedArray(tree))

      })
  }


  callChild1() {
    
    $('#tree-view').html();
    $('svg[width="100%"]').remove();

    this.urlService.getChildVideosAll(this.mainID).subscribe(
      success => {

        let tree = [];
        this.createInteractiveVideoObj.mainVideo.parentId = "0";
        this.createInteractiveVideoObj.mainVideo.level = 0;


       // this.createInteractiveVideoObj.currentPlayingItem = JSON.parse(JSON.stringify(this.createInteractiveVideoObj.mainVideo));
     //   this.createInteractiveVideoObj.currentPlayingItem = tree[0]
       // this.createInteractiveVideoObj.currentObj.open = false;
        tree.push(this.createInteractiveVideoObj.mainVideo);
        for (let i of success.data) {
          // i.children = null;
          if(!(!!i.name))
          {
            i.name = 'Add Video';
            i.poster1 = 'assets/images/H-vidcam.svg'
            i.basck = 'gt'
            i.title = 'Add Video'
            i.imvd = 'imvd'
          }
          else{
            i.basck = 'videochart'
            i.imvd = 'ncs'
          }
          i.id = undefined;
          tree.push(i)
        }
       
       
        this.createInteractiveVideoObj.finalObj = tree;
        // this.createNestedArray(tree)
        this.callTree(this.createNestedArray(tree))
      
      })
  }

  createNestedArray(list) {
    var map = {}, node, roots = [], i;
    for (i = 0; i < list.length; i += 1) {
      map[list[i]._id] = i; // initialize the map
      list[i].children = []; // initialize the children

    }
    for (i = 0; i < list.length; i += 1) {
      node = list[i];
      if (node.parentId !== "0") {
        // if you have dangling branches check that map[node.parentId] exists
        if(list[map[node.parentId]])
        list[map[node.parentId]].children.push(node);
      } else {
        roots.push(node);
      }
    }
    return roots;
  }


  checkedItem(val) {
    this.createInteractiveVideoObj.selectedItem = val;
  }

  closeModal() {
    this.createInteractiveVideoObj.selectedItem = {}
    $('video').trigger('pause');
  }
  closeUploadModal() {
    this.isOpenCreateVideo = false;
    this.createInteractiveVideoObj.selectedItem = {};
    this.createInteractiveVideoObj.interactiveStep = 'one';
    this.createInteractiveVideoObj.selectedVideoCheck = true;
    $('video').trigger('pause');
  }

  callTree(data) {
    $('#tree-view svg').remove();

    let that = this
    let currentHeight = $(window).height() - 180
    let width = $(window).width() - 20
    var treedata = data[0]
    var m = [20, 20, 20, 20],
      w = width,
      h = currentHeight,
      i = 0,
      r = 800,
      x = d3.scale.linear().domain([0, w]).range([0, w]),
      y = d3.scale.linear().domain([0, h]).range([0, h]),
      root;

      //this.zoom1 = d3.behavior.zoom().on("zoom", zoomed);
    var vis = d3.select("#tree-view").append("svg:svg")
      .attr("viewBox", "0 -200 600 900")
      .attr("width", width)
      .attr("height", currentHeight)
      
      .attr("xmlns", "http://www.w3.org/2000/svg")
      .append("svg:g")
      // .attr("pointer-events", "none")
     
      // .attr("-webkit-transform", "translate(" + m[3] + "," + m[0] + ")")
      
     .call(d3.behavior.zoom().x(x).y(y).scaleExtent([0.001, 10]).on("zoom", zoom))
     
     //.call(d3.behavior.zoom().scaleExtent([.1, 3]).on("zoom", zoom))
     
      ;
     
      

      this.visRef = vis
      $('#zoom-reset').click(function(){
       zoom;
    })

    vis.append("rect")
      .attr("class", "overlay")
      .attr("width", w + m[1] + m[3])
      .attr("height", h + m[0] + m[2])
      .attr("opacity", 0);

    // var tree = d3.layout.tree()
    //   .size([h, w]).
    //   nodeSize([200 + 10, 200 + 10])
    //   .separation(function (a, b) {
    //     return a.parent == b.parent ? 1 : 1.25;
    //   });

    var tree = d3.layout.tree()
      .size([h, w]).
      nodeSize([150 + 10, 200 + 10])
      .separation(function () {
        return .5;
      });

    var diagonal = d3.svg.diagonal()
      .projection(function (d) {
        return [d.y, d.x];
      });

    root = treedata;
    root.x0 = h / 2;
    root.y0 = 0;

    function toggleAll(d) {
      if (d.children) {
        d.children.forEach(toggleAll);
        //  toggle(d);
      }
    };

    // initialize the display to show a few nodes.
    root.children.forEach(toggleAll);
    //toggle(root.children[1]);
    //toggle(root.children[9]);

    update(root);

    function update(source) {
      var duration = d3.event && d3.event.altKey ? 5000 : 500;

      // Compute the new tree layout.
      var nodes = tree.nodes(root).reverse();

      // Normalize for fixed-depth.
      nodes.forEach(function (d) {
        d.y = d.depth * 250;
        // d.x = d.depth;
      })

      // Update the nodes...
      var node = vis.selectAll("g.node")
        .data(nodes, function (d) {
          return (d.id = ++i);
        })

      // Enter any new nodes at the parent's previous position.
      var nodeEnter = node.enter().append("svg:g")
        .attr("class", "node")
        .attr("id", function (d) {
     
       //   console.log(d)
          return "node-" + d.id;
        })
        .attr("transform", function (d) {
          return "translate(" + source.y0 + "," + source.x0 + ")";
        })
        // .attr("-webkit-transform", function (d) {
        //   return "translate(" + source.y0 + "," + source.x0 + ")";
        // })
        .on("click", function (d) {
          //toggle(d);
          //update(d);
          // if (d['info']) {
          //   playvid(d['info']);
          // }
        });

      nodeEnter.append("svg:circle")
        .attr("r", 1e-6)
        .style("fill", function (d) {
          return d._children ? "#000" : "#000";
        });

      var nodeText = nodeEnter
        .append("svg:foreignObject")
        //.attr("y", function(d) { return d.children || d._children ? -10 : 10; })
        //.attr("dx", ".35em")
        //.attr("x", function(d) {
        //  return d.children || d._children ? -10 : 10;
        //})
        .attr("y", -30)
        .attr("x", -5)
        .attr("text-anchor", function (d) {
         
          return d.children || d._children ? "end" : "start";
        })
        .style("fill-opacity", 1e-6)
        .attr('width', 80)
        .attr('height', 80)
        .append('xhtml:button')
        .attr("class", "video-component").
        on("click", function (d) {
          let d1 = d
          that.clickedItem(d1)
          
        })
      // .attr("data-toggle","modal")
      // .attr("data-target","tree-Modal");


      nodeText
        .append('xhtml:video')

        // attr('class', 'videochart') 
        .attr('class', function (d) { return d.basck })
      //  attr('src', function (d) { return d.URL })
        .attr('poster', function (d) { return d.poster })


      // nodeText
      // .append('iframe','div').
      // attr('class','iframechart').
      // attr('src',function(d) { return d.URL})
      // .attr('allow','accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture');



      // .attr('controls','true')imvd
      var SpanText = nodeText.append("img", "div")
      .attr("class", function (d) {
        return d.imvd;
      })
      .attr('src',function (d) {
        return d.poster1;
      });


      var SpanText = nodeText.append("span", "div")
        .attr("class", "node-text")
        .text(function (d) {
          return d.name;
        });
      var SpanText = nodeText.append("span", "div")
        .attr("class", "overlay-vid");
      
      //Edit node button
      nodeText.filter(function (d) {
        return d.editable;
      })
        .append("a")
        .attr("class", "node-edit")
        .on("click", onEditNode, true)
        .append("i")
        .attr("class", "fa fa-pencil");

      //Add node button
      nodeText.filter(function (d) {
        return d.addable;
      })
        .append("a")
        .attr("class", "node-add")
        .on("click", onAddNode, true)
        .append("i")
        .attr("class", "fa fa-plus");

      //Remove node button
      nodeText.filter(function (d) {
        return d.removable;
      })
        .append("a")
        .attr("class", "node-remove")
        .on("click", onRemoveNode, true)
        .append("i")
        .attr("class", "fa fa-times");

      // Transition nodes to their new position.
      var nodeUpdate = node.transition()
        .duration(duration)
        .attr("transform", function (d) {
          return "translate(" + d.y + "," + d.x + ")";
        })
        // // .attr("-webkit-transform", function (d) {
        //   return "translate(" + d.y + "," + d.x + ")";
        // });

      nodeUpdate.select("circle")
        .attr("r", 4.5)
        .style("fill", function (d) {
          return d._children ? "#000" : "#000";
        });

      nodeUpdate.select("text")
        .style("fill-opacity", 1);

      // Transition exiting ndoes to the parent's new position.
      var nodeExit = node.exit().transition()
        .duration(duration)
        .attr("transform", function (d) {
          return "translate(" + source.y + "," + source.x + ")";
        })
        .remove();

      nodeExit.select("circle")
        .attr("r", 1e-6);
      nodeExit.select("text")
        .style("fill-opacity", 1e-6);

      // Update the links...
      var link = vis.selectAll("path.link")
        .data(tree.links(nodes), function (d) {
          return d.target.id;
        });

      // Enter any new links at hte parent's previous position
      link.enter().insert("svg:path", "g")
        .attr("class", "link")
        .attr("d", function (d) {
          var o = {
            x: source.x0,
            y: source.y0
          };
          return diagonal({
            source: o,
            target: o
          });
        })
        .transition()
        .duration(duration)
        .attr("d", diagonal);

      // Transition links to their new position.
      link.transition()
        .duration(duration)
        .attr("d", diagonal);

      // Transition exiting nodes to the parent's new position.
      link.exit().transition()
        .duration(duration)
        .attr("d", function (d) {
          var o = {
            x: source.x,
            y: source.y
          };
          return diagonal({
            source: o,
            target: o
          });
        })
        .remove();

      // Stash the old positions for transition.
      nodes.forEach(function (d) {
        d.x0 = d.x;
        d.y0 = d.y;
      });

      // var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
      // if(isSafari){
      //   setInterval(()=>{
      //         $('#tree-view g[transform]').each(function() {
      //           let transform = $(this).attr('transform')
      //           transform = transform.split('(');
      //           //transform = transform[1].split(',')
      //         transform = transform[1].split(')')
      //           transform = transform[0].split(',')
                
      //         $(this).css({'-webkit-transform':'translate('+transform[0]+'px,'+transform[1]+'px)'});
      //           // `this` is the div
      //       });
      //     },2000)
      //   }
    }

    // Toggle children
    // function toggle(d) {
    //   if (d.children) {
    //     d._children = d.children;
    //     d.children = null;
    //   } else {
    //     d.children = d._children;
    //     d._children = null;
    //   }
    // }

  
    // function zoomed() {
    //   this.visRef.attr("transform", d3.event.transform)
    // }


    // zoom in / out
    function zoom(d) {
     

     
      var nodes = vis.selectAll("g.node");
      nodes.attr("transform", transform);
      // // nodes.attr("-webkit-transform", transform);

      // // Update the links...
      var link = vis.selectAll("path.link");
      link.attr("d", translate).attr("stroke-width", "1px")
        .attr("stroke", "black")
      // if(d3.event.scale > 1)
      // {
      //   vis.attr("transform", "translate(" + d3.event.translate+ ")scale(" + d3.event.scale + ")");
      // }
      // else{
        vis.attr("transform", "scale(" + d3.event.scale + ")");
        //setInterval(()=>{
          that.zoomRef = d3.event.scale;
       
       // },1000);
        
      // }
              
       
       

      // Enter any new links at hte parent's previous position
      //link.attr("d", function(d) {
      //      var o = {x: d.x0, y: d.y0};
      //      return diagonal({source: o, target: o});
      //    });
    }

    // $(".video-component iframe[src^='https://video-playback-public.s3.amazonaws.com'").html('');
    function transform(d) {
      return "translate(" + x(d.y) + "," + y(d.x) + ")";
    }

    function translate(d) {
      var sourceX = x(d.target.parent.y);
      var sourceY = y(d.target.parent.x);
      var targetX = x(d.target.y);
      var targetY = (sourceX + targetX) / 2;
      var linkTargetY = y(d.target.x0);
      var result = "M" + sourceX + "," + sourceY + " C" + targetX + "," + sourceY + " " + targetY + "," + y(d.target.x0) + " " + targetX + "," + linkTargetY + "";
      //console.log(result);

      return result;
    }


    function onEditNode(d) {
      var length = 9;
      var id = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, length);
      addChildNode(d.id, {
        "name": "new child node",
        "id": id,
        "type": "type2"
      });
      stopPropogation();
    }

    function onAddNode(d) {
      var length = 9;
      var id = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, length);
      addChildNode(d.id, {
        "name": "new child node",
        "id": id,
        "type": "type2"
      });
      stopPropogation();
    }

    function onRemoveNode(d) {
      var index = d.parent.children.indexOf(d);
      if (index > -1) {
        d.parent.children.splice(index, 1);
      }
      //update(d.parent);
      stopPropogation();
    }

    function addChildNode(parentId, newNode) {
      var node = d3.select('#' + 'node-' + parentId);
      var nodeData = node.datum();
      if (nodeData.children === undefined && nodeData._children === undefined) {
        nodeData.children = [newNode];
      } else if (nodeData._children != null) {
        nodeData._children.push(newNode);
        //  toggle(nodeData);
      } else if (nodeData.children != null) {
        nodeData.children.push(newNode);
      }
      update(node);
      stopPropogation();
    }

    // function toggleEnable(d) {
    //   d.enable = !d.enable;
    //   var node = d3.select('#' + 'node-' + d.id + " .node-label")
    //     .classed("disabled", !d.enable);
    //   stopPropogation();
    // }


    function stopPropogation() {
      d3.event.stopPropagation();
    }
    this.createInteractiveVideoObj.selectedVideoCheck = false;
    this.createInteractiveVideoObj.interactiveStep = 'three';
    this.createInteractiveVideoObj.spinner = false;
  }

zoomIn()
{
 
  this.zoomRef = this.zoomRef + 0.3

  this.visRef.transition()
  .duration(750).attr("transform", "scale(" + this.zoomRef + ")");
 
}
zoomOut()
{
  
  this.zoomRef = this.zoomRef - 0.3;  
  this.visRef.transition()
  .duration(750).attr("transform", "scale(" + this.zoomRef + ")");

}
zoomReset()
{
  this.visRef.transition()
  .duration(750).attr("transform", "scale(" + 1 + ")");
  this.zoomRef =1;
 

}
name;
  clickedItem(d) {
    this.createInteractiveVideoObj.currentObj = d;
    this.createInteractiveVideoObj.currentObj.open = true;
    for (let i of this.createInteractiveVideoObj.finalObj) {
      if (d._id == i.parentId) {
        i.URLName = i.name
        this.name=i.name
        this.createChoiceObj.child.push(i);
      }

    }
    if(d.name == 'Add Video'){
      this.replaceVideo();
    }
    else{
      var minutes = Math.floor(this.createInteractiveVideoObj.currentObj.time / 60);
      var seconds = this.createInteractiveVideoObj.currentObj.time - minutes * 60;
      this.createInteractiveVideoObj.currentObj.mmm = minutes;
      this.createInteractiveVideoObj.currentObj.sss = seconds;

      
    $('#tree-Modal').modal('show');
  }

  }
  UptheMouse()
  {
    
    if(this.createChoiceObj.currentNo > 4)
    {
      this.createChoiceObj.currentNo  =  4
    }
  }

  selectVideoTypes(type) {
    this.createInteractiveVideoObj.selectedType = type;
    this.createInteractiveVideoObj.interactiveStep = 'three'
  }



  changeFilterUploadVideo(val) {

    if (val == 'recentFirst') {
      this.createInteractiveVideoObj.allUploadedVideo.sort(function (a, b) {
        if (a.updatedAt > b.updatedAt) {
          return 1;
        }
        return -1
      })
    }

    else if (val == 'size') {
      this.createInteractiveVideoObj.allUploadedVideo.sort(function (a, b) {
        if (a.size > b.size) {
          return -1;
        }
        return 1
      })
    }
    else if (val == 'duration') {
      this.createInteractiveVideoObj.allUploadedVideo.sort(function (a, b) {
        if (a.duration > b.duration) {
          return -1;
        }
        return 1
      })
    }
    else if (val == 'name') {
      this.createInteractiveVideoObj.allUploadedVideo.sort(function (a, b) {
        if (a.name > b.name) {
          return -1;
        }
        return 1
      })

    }

  }


  changeFilterURL(val) {

    if (val == 'recentFirst') {
      this.createInteractiveVideoObj.allUrls.sort(function (a, b) {
        if (a.updatedAt > b.updatedAt) {
          return 1;
        }
        return -1
      })
    }

    else {
      this.createInteractiveVideoObj.allUrls.sort(function (a, b) {
        if (a.size > b.size) {
          return -1;
        }
        return 1
      })
    }
  }

  clickSelectVideo() {
    console.log('This function called');
    
    if (this.createInteractiveVideoObj.allVideos.length < 1) {
      this.toastr.error('No Video Uploaded, Kindly Upload Videos!');
      return;
    }
    this.isOpenCreateVideo = true;
    $('#upload-vid-Modal').modal({ backdrop: 'static', keyboard: false }, 'show');
    this.createInteractiveVideoObj.selectedVideoCheck = false;
    this.createInteractiveVideoObj.interactiveStep = 'three'
  }

  uploadAVideo() {
    this.router.navigate(['/upload-videos'])
  }


  createInteractiveVideo() {
    if (typeof (this.createInteractiveVideoObj.selectedItem) != 'object') {
      this.toastr.warning('Please select an initial video!');
      return;
    }
    this.createInteractiveVideoObj.spinner = true;
    let obj: any = { type: 'main', poster: this.createInteractiveVideoObj.selectedItem.poster,name: this.createInteractiveVideoObj.selectedItem.name, URL: this.createInteractiveVideoObj.selectedItem.URL, Thumbnail: this.createInteractiveVideoObj.selectedItem.Thumbnail, Title: '', Description: '', Categories: [], time: 0, parentId: null,videoID: this.createInteractiveVideoObj.selectedItem._id }
    this.urlService.createInteractiveVideo(obj).subscribe(
      success => {
        this.closeModal();
        this.isOpenCreateVideo = false;
        $('#upload-vid-Modal').modal('hide');
       // $('#upload-url-Modal').modal('hide');
        this.createInteractiveVideoObj.spinner = false;
        this.createInteractiveVideoObj.selectedItem = {}
        this.createInteractiveVideoObj.selectedVideoCheck = false;
       //  this.createInteractiveVideoObj.step = 'three';
        this.router.navigate(['create-interactive-video'], { queryParams: { video: success.data.data._id } });
        window.localStorage.removeItem('freeTemp')
        this.intialFunction('')

        //  this.createInteractiveVideoObj.interactiveVideo;
      },
      error => {

      })
    this.createInteractiveVideoObj.step = 'three';
  }

  //child sectim

  deleteCUrrentNode() {
    this.createInteractiveVideoObj.spinner = true;
    let isDetele = confirm('Are you sure you want to delete video!')
    if (isDetele) {
      if(this.createInteractiveVideoObj.currentObj.type == 'main'){
      this.urlService.deleteBookMarkVideo(this.createInteractiveVideoObj.currentObj._id).subscribe(
        success => {
          this.createInteractiveVideoObj.spinner = false;
          this.toastr.success('Delete successfully!')
          $('#tree-Modal').modal('hide');
          this.createChoiceObj.child = [];
          this.callChild1();
          //this.intialFunction('')
        })
      }
      else
      {
        let Payload  = {
          videoId: this.createInteractiveVideoObj.currentObj._id,
          mainId: this.createInteractiveVideoObj.currentObj.parentId
        }
        
        this.urlService.deleteChildVideo(Payload).subscribe(
          success => {
            this.createInteractiveVideoObj.spinner = false;
            $('#tree-Modal').modal('hide');
            this.createChoiceObj.child = [];
            this.callChild1();
            this.toastr.info('Updated Successfully!');
            //this.intialFunction('')
          })
        
      }
    }
    // this.createInteractiveVideoObj.currentObj
  }

  addChoices(no) {

    for (let i = 0; i < no; i++) {
      let name = 'Untitled ' + i
      let obj: any = { name: name, URL: '', _id: '', parentId: this.createInteractiveVideoObj.currentObj._id }
      this.createChoiceObj.child.push(obj)
    }
    this.createChoiceObj.parent = this.createInteractiveVideoObj.currentObj
  }

  addMoreChoices() {
 

   

    if (this.createChoiceObj.child.length > 3) {
      this.toastr.warning('Choices can not be more then 4!');
      return;
    }

    let i = this.createChoiceObj.child.length - 1
    let name = 'Untitled ' + i
    let obj: any = { name: name, URL: '', _id: '', parentId: this.createInteractiveVideoObj.currentObj._id }
    this.createChoiceObj.child.push(obj)
  }


  updateCurrentName(name) {
    if (this.createInteractiveVideoObj.currentObj.time > this.createInteractiveVideoObj.currentObj.duration) {
      this.toastr.error('Please select with in the duratin of video!');
      return;
    }
    this.createInteractiveVideoObj.spinner = true;
    // console.log(this.createInteractiveVideoObj.currentObj)
    let obj: any = { id: this.createInteractiveVideoObj.currentObj._id, type: this.createInteractiveVideoObj.currentObj.type, name: this.createInteractiveVideoObj.currentObj.name, URL: this.createInteractiveVideoObj.currentObj.URL, Title: this.createInteractiveVideoObj.currentObj.Title, Description: this.createInteractiveVideoObj.currentObj.Description, Categories: this.createInteractiveVideoObj.currentObj.Categories, time: this.createInteractiveVideoObj.currentObj.time, parentId: this.createInteractiveVideoObj.currentObj.parentId, poster:this.createInteractiveVideoObj.currentObj.poster,videoID: this.createInteractiveVideoObj.currentObj._id}
    this.urlService.updateInteractiveVideo(obj).subscribe(
      success => {
        // this.callTree(this.createInteractiveVideoObj.currentObj)
        this.callChild1();
        this.toastr.info('Updated Successfully!');
       // this.createInteractiveVideoObj.spinner = false;
        //this.closeModal();
      },
      error => {
        this.createInteractiveVideoObj.spinner = false;

      })
  }




  //add child
  selectionChanged(e, number) {

    console.log('selected video',e)
    this.createInteractiveVideoObj.spinner = true;
   
    if (this.createInteractiveVideoObj.currentNodeOption == '') {
      // let objFinal: any = { type: 'child', name: e.value.name, parentId: this.createInteractiveVideoObj.currentObj._id, URL: e.value.URL, time: 0,poster: e.value.poster,videoID: e.value._id }
      let objFinal: any = { type: 'child', name: e.name, parentId: this.createInteractiveVideoObj.currentObj._id, URL: e.URL, time: 0,poster: e.poster,videoID: e._id }
      this.urlService.createInteractiveVideo(objFinal).subscribe(
        success => {
        //  this.createInteractiveVideoObj.spinner = false;
          //this.createInteractiveVideoObj.finalObj.push(success.data.data)
          //this.callChild1();
          this.callChild1();
          this.toastr.info('Updated Successfully!');
          //this.callTree(this.createInteractiveVideoObj.currentObj)
        },
        error => {
          this.createInteractiveVideoObj.spinner = false;
        })
    }

    else {
      // let objFinal: any = { type: 'child', name: e.value.name, parentId: this.createInteractiveVideoObj.currentObj._id, URL: e.value.URL, time: e.value.time, _id: e.value._id ,poster: e.value.poster,videoID: e.value._id }
      let objFinal: any = { type: 'child', name: e.name, parentId: this.createInteractiveVideoObj.currentObj._id, URL: e.URL, time: e.time, _id: e._id ,poster: e.poster,videoID: e._id }
      this.urlService.updateInteractiveVideo(objFinal).subscribe(
        success => {
          this.createInteractiveVideoObj.spinner = false;
          this.callChild1();
          this.toastr.info('Updated Successfully!');
          // this.createInteractiveVideoObj.finalObj.push(objFinal)
          // this.callTree(this.createInteractiveVideoObj.currentObj)
        },
        error => {
          this.createInteractiveVideoObj.spinner = false;
        })

    }

  }


  updateCurrentTime(time) {
   
    this.createInteractiveVideoObj.currentObj.time = this.createInteractiveVideoObj.currentObj.mmm * 60 + this.createInteractiveVideoObj.currentObj.sss
    if (this.createInteractiveVideoObj.currentObj.time > this.createInteractiveVideoObj.currentObj.duration) {
      this.toastr.error('Time should be less then duration!');
      this.createInteractiveVideoObj.currentObj.time = 0;
      this.createInteractiveVideoObj.currentObj.mmm = 0;
      this.createInteractiveVideoObj.currentObj.sss = 0;
      return;
    }
    let obj: any = { id: this.createInteractiveVideoObj.currentObj._id, type: this.createInteractiveVideoObj.currentObj.type, poster: this.createInteractiveVideoObj.currentObj.poster,  name: this.createInteractiveVideoObj.currentObj.name, URL: this.createInteractiveVideoObj.currentObj.URL, Title: this.createInteractiveVideoObj.currentObj.Title, Description: this.createInteractiveVideoObj.currentObj.Description, Categories: this.createInteractiveVideoObj.currentObj.Categories, time: this.createInteractiveVideoObj.currentObj.time, parentId: this.createInteractiveVideoObj.currentObj.parentId,videoID: this.createInteractiveVideoObj.currentObj._id }
    this.createInteractiveVideoObj.spinner = true;
    this.urlService.updateInteractiveVideo(obj).subscribe(
      success => {
        //this.createInteractiveVideoObj.spinner = false;
        this.callChild1();
        this.toastr.info('Updated Successfully!');
        //this.callTree(this.createInteractiveVideoObj.currentObj)
      },
      error => {
        this.createInteractiveVideoObj.spinner = false;
      })
  }

  refreshInteractiveVideo() {
    $('#tree-Modal').modal('hide');
    this.createChoiceObj.child = [];
    this.createInteractiveVideoObj.currentObj.open = false;
    this.intialFunction('')
  }

  closeInteractiveVideo() {
    $('#tree-Modal').modal('hide');

    this.createChoiceObj.child = [];

    this.createInteractiveVideoObj.currentObj = {};
    //  d3.selectAll("svg > *").remove();
    // this.intialFunction()
  }
  // this.createInteractiveVideoObj.allVideos


  getDuration(e) {
    this.createInteractiveVideoObj.currentObj.duration = e.target.duration
    let hasChilren = false
    if (this.createInteractiveVideoObj.currentObj.children == null || this.createInteractiveVideoObj.currentObj.children == undefined) {
      hasChilren = false;
    }
    else {
      if (this.createInteractiveVideoObj.currentObj.children.length > 0) {
        hasChilren = true
      }
      else {
        hasChilren = false
      }
    }
    this.placeMarker(hasChilren, this.createInteractiveVideoObj.currentObj.time, 'video-all', e.target.duration)
  }


  replaceVideo() {
    $('#tree-Modal').modal('hide');

    $('#select-vid-Modal').modal({ backdrop: 'static', keyboard: false }, 'show');
    this.createInteractiveVideoObj.currentObj.open  =  false;
    this.OpenPopupAll = true;
  }
  checkedReaplceItem(item) {
    this.createInteractiveVideoObj.selectedItem = item;
    console.log(this.createInteractiveVideoObj.selectedItem._id);
    
  }

  replaceVideoData() {
    let obj: any = {};
    if(this.createInteractiveVideoObj.currentObj.name == 'Add Video'){
      obj = { id: this.createInteractiveVideoObj.currentObj._id, type: this.createInteractiveVideoObj.currentObj.type, name: this.createInteractiveVideoObj.selectedItem.name, URL: this.createInteractiveVideoObj.selectedItem.URL, poster: this.createInteractiveVideoObj.selectedItem.poster, Title: this.createInteractiveVideoObj.selectedItem.Title, Description: this.createInteractiveVideoObj.currentObj.Description, Categories: this.createInteractiveVideoObj.currentObj.Categories, time: this.createInteractiveVideoObj.currentObj.time, parentId: this.createInteractiveVideoObj.currentObj.parentId,videoID: this.createInteractiveVideoObj.currentObj._id}
  
    }
    else{
      obj = { id: this.createInteractiveVideoObj.currentObj._id, type: this.createInteractiveVideoObj.currentObj.type, name: this.createInteractiveVideoObj.currentObj.name, URL: this.createInteractiveVideoObj.selectedItem.URL, poster: this.createInteractiveVideoObj.selectedItem.poster, Title: this.createInteractiveVideoObj.currentObj.Title, Description: this.createInteractiveVideoObj.currentObj.Description, Categories: this.createInteractiveVideoObj.currentObj.Categories, time: this.createInteractiveVideoObj.currentObj.time, parentId: this.createInteractiveVideoObj.currentObj.parentId,videoID: this.createInteractiveVideoObj.currentObj._id}
  
    }
      this.createInteractiveVideoObj.spinner = true;
    this.urlService.updateInteractiveVideo(obj).subscribe(
      success => {
       // this.createInteractiveVideoObj.currentObj.URL  = this.createInteractiveVideoObj.selectedItem.URL
        this.createInteractiveVideoObj.currentObj.poster  = this.createInteractiveVideoObj.selectedItem.poster
        this.createInteractiveVideoObj.currentObj.imvd = 'ncs';
        this.createInteractiveVideoObj.currentObj.basck = 'videochart';
        //     if(this.createInteractiveVideoObj.selectedItem.type == 'URL')
        //  {
        //   this.createInteractiveVideoObj.currentObj.URL = this.sanitizer.bypassSecurityTrustResourceUrl(this.createInteractiveVideoObj.selectedItem.URL)
        //   this.createInteractiveVideoObj.currentObj.URLType = 'URL';
        //   this.createInteractiveVideoObj.currentObj.youtubeURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.createInteractiveVideoObj.selectedItem.URL)
        //  }
        //  else{
        this.createInteractiveVideoObj.currentObj.URL = this.createInteractiveVideoObj.selectedItem.URL;
        if(this.createInteractiveVideoObj.currentObj.name == 'Add Video'){
          this.createInteractiveVideoObj.currentObj.name = this.createInteractiveVideoObj.selectedItem.name
          this.createInteractiveVideoObj.currentObj.Title = '';
        }
        this.createInteractiveVideoObj.currentObj.open  =  true;
        // this.createInteractiveVideoObj.currentObj.URLType = 'video';
        // this.createInteractiveVideoObj.currentObj.youtubeURL = '';
        //  }
        // this.createInteractiveVideoObj.currentObj.URL = this.sanitizer.bypassSecurityTrustResourceUrl(this.createInteractiveVideoObj.selectedItem.URL)
       // this.createInteractiveVideoObj.spinner = false;
       this.callChild1();
       this.toastr.info('Updated Successfully!');
        this.OpenPopupAll = false;
        this.closeModal();
        //this.createInteractiveVideoObj.selectedItem.URL = null
        $('#tree-Modal').modal('show')
        $('#select-vid-Modal').modal('hide');
        //this.callTree(this.createInteractiveVideoObj.currentObj)
      },
      error => {
        this.createInteractiveVideoObj.spinner = false;
      })

  }




  // Preview Video
  previewVIdeo() {

    if(this.createInteractiveVideoObj.mainVideo.name == 'Add Video')
    {
      this.toastr.warning('Please Add parent Video!')  
      return;
    }
    this.createInteractiveVideoObj.preview =  true;
    //this.toastr.info('Preparing Video!')
    $('#tree-preview-vid-Modal').modal( 'show');
    $('#tree-publish-vid-Modal').modal('hide');
   }

  getCurrentTime(e) {
    this.interval = setInterval(() => {
      this.createInteractiveVideoObj.currentPlayingItem.currentTime = e.target.currentTime;
    }, 1000)

    let hasChilren: any = false;
    if (this.createInteractiveVideoObj.currentPlayingItem.children == null || this.createInteractiveVideoObj.currentPlayingItem.children == undefined) {
      hasChilren = false;
    }
    else {
      if (this.createInteractiveVideoObj.currentPlayingItem.children.length > 0) {
        hasChilren = true
      }
      else {
        hasChilren = false
      }
    }

    //  this.createInteractiveVideoObj.currentPlayingItem.currentTime = e.target.currentTime
    this.placeMarker(hasChilren, this.createInteractiveVideoObj.currentPlayingItem.time, 'previewVideo', e.target.duration)

    this.createInteractiveVideoObj.currentPlayingItem.currentTime = e.target.currentTime

  }

  closePreview() {
    $('#tree-preview-vid-Modal').modal('hide');
    this.createInteractiveVideoObj.preview =  false;
    clearInterval(this.interval)
    //this.createInteractiveVideoObj.currentPlayingItem = {};
  }

  publishPreview() {
    if(this.createInteractiveVideoObj.mainVideo.name == 'Add Video')
    {
      this.toastr.warning('Please Add parent Video!')  
      return;
    }
    clearInterval(this.interval);

    this.toastr.info('Preparing Video!')
    this.createInteractiveVideoObj.spinner = true;
    this.urlService.fetchCategories().subscribe(
      sucess => {

        this.availableCategory = sucess.data.categories;
        this.availableCategory = this.availableCategory.sort(function(a:any,b:any){
            if(a<b)
            {
              return -1;
            }
        })
       // this.intialFunction('Pr');
        this.closePreview();
        this.createInteractiveVideoObj.spinner = false;
        this.createInteractiveVideoObj.publish = true;
        $('#tree-publish-vid-Modal').modal({ backdrop: 'static', keyboard: false }, 'show');   
        this.filledLogin('main_title')
        this.filledLogin('user_Description')
      }
    )
    }

  loadNextOption(e) {
    clearInterval(this.interval)
    this.createInteractiveVideoObj.currentPlayingItem.currentTime = 0;
    this.createInteractiveVideoObj.preview =  false;
   // this.toastr.info('Choice Selected');
    setTimeout(()=>{
      this.createInteractiveVideoObj.currentPlayingItem = e;
      this.createInteractiveVideoObj.preview =  true;
    },100)
   // this.createInteractiveVideoObj.currentPlayingItem = e;
  }

  onSubmit() {
    if(!!this.item)
    {
      this.createInteractiveVideoObj.mainVideo.poster = this.item;

    }
    let obj: any = { 
      id: this.createInteractiveVideoObj.mainVideo._id, 
      type: this.createInteractiveVideoObj.mainVideo.type, 
      name: this.createInteractiveVideoObj.mainVideo.name, 
      URL: this.createInteractiveVideoObj.mainVideo.URL, 
      Title: this.createInteractiveVideoObj.mainVideo.Title, 
      Description: this.createInteractiveVideoObj.mainVideo.Description, 
      Categories: this.createInteractiveVideoObj.mainVideo.Categories, 
      time: this.createInteractiveVideoObj.mainVideo.time, 
      parentId: this.createInteractiveVideoObj.mainVideo.parentId, 
      poster: this.createInteractiveVideoObj.mainVideo.poster, 
      videoID: this.createInteractiveVideoObj.mainVideo._id
    }

    let mainTitle = this.createInteractiveVideoObj.mainVideo.Title;
    this.createInteractiveVideoObj.spinner = true;
    this.urlService.updateInteractiveVideo(obj).subscribe(
      success => {
        if(!this.createInteractiveVideoObj.mainVideo.isPublished) {
          let finalObj = {
            "type":"publish",
            "videoID":this.createInteractiveVideoObj.mainVideo._id
          }
          let totalCategories = this.createInteractiveVideoObj.mainVideo.Categories.length;
          
          
          if (totalCategories < 1) {
            this.createInteractiveVideoObj.spinner = false;
            this.toastr.warning('Select at least one category');
          } else if (mainTitle === '') {
            this.createInteractiveVideoObj.spinner = false;
            this.toastr.error('Title can not be blank');
          } else {
            this.urlService.publishunpublish(finalObj).subscribe(
              success => {
                this.createInteractiveVideoObj.spinner = false;
                this.toastr.success('Published successfully!');
  
                $('#tree-publish-vid-Modal').modal('hide');
                this.cancelPublish();
                localStorage.setItem('tempToken','848484')
                this.router.navigate(['my-videos']);
              });
          }
        }
        else{
          $('#tree-publish-vid-Modal').modal('hide');
          this.cancelPublish();
          localStorage.setItem('tempToken','848484')
          this.router.navigate(['my-videos']);
          this.createInteractiveVideoObj.spinner = false;
        }
        
         
    });
  }

  publishVIdeoFooter() {
    if(this.createInteractiveVideoObj.mainVideo.name == 'Add Video')
    {
      this.toastr.warning('Please Add parent Video!')  
      return;
    }
    this.toastr.info('Preparing Video!')
    this.createInteractiveVideoObj.spinner = true;
    this.urlService.fetchCategories().subscribe(
      sucess => {
        this.availableCategory = sucess.data.categories;
       // this.intialFunction('Pr');
        this.closePreview();
        this.createInteractiveVideoObj.spinner = false;
        this.createInteractiveVideoObj.publish = true;
        $('#tree-publish-vid-Modal').modal({ backdrop: 'static', keyboard: false }, 'show');   
        this.filledLogin('main_title')
        this.filledLogin('user_Description')
      }
    )

  }
  addVideoTitle()
  {
    let obj: any = { id: this.createInteractiveVideoObj.mainVideo._id, type: this.createInteractiveVideoObj.mainVideo.type, name: this.createInteractiveVideoObj.mainVideo.name, URL: this.createInteractiveVideoObj.mainVideo.URL, Title: this.createInteractiveVideoObj.mainVideo.Title, Description: this.createInteractiveVideoObj.mainVideo.Description, Categories: this.createInteractiveVideoObj.mainVideo.Categories, time: this.createInteractiveVideoObj.mainVideo.time, parentId: this.createInteractiveVideoObj.mainVideo.parentId,poster: this.createInteractiveVideoObj.mainVideo.poster,videoID: this.createInteractiveVideoObj.mainVideo._id }
    //this.createInteractiveVideoObj.spinner = true;
    this.urlService.updateInteractiveVideo(obj).subscribe(
      success => {
      })
  }

  cancelPublish() {
    $('#tree-publish-vid-Modal').modal('hide');
    this.createInteractiveVideoObj.publish = false
  }

  getCurrentTimePublish(e) {

    let hasChilren: any = false;
    if (this.createInteractiveVideoObj.mainVideo.children == null || this.createInteractiveVideoObj.mainVideo.children == undefined) {
      hasChilren = false;
    }
    else {
      if (this.createInteractiveVideoObj.mainVideo.children.length > 0) {
        hasChilren = true
      }
      else {
        hasChilren = false
      }
    }

    //console.log(hasChilren,this.createInteractiveVideoObj.mainVideo,'publishVideo',e.target.duration)
    //  this.createInteractiveVideoObj.mainVideo.currentTime = e.target.currentTime
    this.placeMarker(hasChilren, this.createInteractiveVideoObj.mainVideo.time, 'publishVideo', e.target.duration)
  }
  //  publishProfileForm


  placeMarker(haveChildren, markerTime, id, duration) {
   
    let that = this
   
   

    $('#'+id+ ' .vjs-control-bar').append('<button title="Start Over"><svg class="bi bi-arrow-clockwise" width="1.5em" height="1.5em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">'+
    '<path fill-rule="evenodd" d="M3.17 6.706a5 5 0 017.103-3.16.5.5 0 10.454-.892A6 6 0 1013.455 5.5a.5.5 0 00-.91.417 5 5 0 11-9.375.789z" clip-rule="evenodd"/>'+
   ' <path fill-rule="evenodd" d="M8.147.146a.5.5 0 01.707 0l2.5 2.5a.5.5 0 010 .708l-2.5 2.5a.5.5 0 11-.707-.708L10.293 3 8.147.854a.5.5 0 010-.708z" clip-rule="evenodd"/>'+
  '</svg></button>').click(function(){
    that.createInteractiveVideoObj.preview = false;
    setTimeout(()=>{
    that.createInteractiveVideoObj.currentPlayingItem =  that.createInteractiveVideoObj.mainVideo
    that.createInteractiveVideoObj.preview = true;
    clearInterval(that.interval)
  },100)
    
  })

    if (!haveChildren) {
      $('.marker').remove();
    }
    else {
      let width = $('#' + id).width();
      let precentageOfMarker = (markerTime / duration) * 100;
      $('.marker').remove();
      $('#' + id+' .vjs-progress-holder.vjs-slider.vjs-slider-horizontal').append('<div class="marker" style="left:' + precentageOfMarker + '%"></div>');
         
      // $('#'+id).parent().append();

    }
  }

  changeUserLogin(id) {
    if ($('#' + id).val() != "") {
      $('#' + id).siblings('.input-field').addClass('video_input_focus');
      $('#' + id).addClass('focusIn');
    } else {
      $('#' + id).siblings('.input-field').removeClass('video_input_focus');
    }
  }

  filledLogin(id) {
    $('#' + id).siblings('.input-field').addClass('video_input_focus');
    $('#' + id).addClass('focusIn');
  }


  preview(files) {
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.toastr.error('Only images are supported!');
      return;
    }

    var reader = new FileReader();
    this.createInteractiveVideoObj.mainVideo.imagePath = files;
    this.createInteractiveVideoObj.mainVideo.fileData = files[0]
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      // this.createInteractiveVideoObj.mainVideo.profilePic = reader.result; 
      // this.createInteractiveVideoObj.mainVideo.thumbnail.push(reader.result)
    }
    this.updateProfilePic();

  }

  updateProfilePic() {
    this.createInteractiveVideoObj.spinner = true;
    const formData = new FormData();
    formData.append('file', this.createInteractiveVideoObj.mainVideo.fileData);
    formData.append('VideoID', this.createInteractiveVideoObj.mainVideo._id);

    this.urlService.uploadThumbnails(formData).subscribe(
      success => {
         this.toastr.success('Image updated successfully');
       // this.createInteractiveVideoObj.mainVideo.poster = success.data;
        this.createInteractiveVideoObj.mainVideo.thumbnail.push(success.data)
        this.createInteractiveVideoObj.spinner = false;
      }
    )
  }

  // Get contributors data
  getFollowersList(){
    this.urlService.userDetails().subscribe(
      success => {
        this.urlService.getUserInfo(success.data.details._id).subscribe(
          success => {
            this.followers = success.data.followersinfo;
            this.following = success.data.followinginfo;
            // let contri: Array<any> = [...this.followers, ...this.following]; 
            console.log('contri: ', this.followers[0].info.profilePic);
          });
      });
  }

  openContributorModal () {
    this.isShareOpen = true;
    $('#contributor-Modal').modal('show');
    
  }

  closeContributorModal () {
    
    $('#contributor-Modal').modal('hide');
    this.isShareOpen = false;
    
  }
  deleteThumbnails(i:any)
  {
    let obj=
    {
      "url": i, 
      "videoId": this.mainID
  }
  this.createInteractiveVideoObj.spinner = true;
  this.urlService.deleteThumbnails(obj).subscribe(
    success => {
      this.createInteractiveVideoObj.spinner = false;
      for(let j=this.createInteractiveVideoObj.mainVideo.thumbnail.length-1; j>-1;j--)
      {
        if(i == this.createInteractiveVideoObj.mainVideo.thumbnail[j])
        {
       
          this.createInteractiveVideoObj.mainVideo.thumbnail.splice(j,1)
          break;
        }
      }
    })
  



  }
  getFollowingId(e: any,isChecked) {
    if(isChecked == false)
    {
      for(let i=this.contrubutors.length-1; i>=0;i--)
      {
        if(e == this.contrubutors[i])
        {
          this.contrubutors.splice(i,1);
        }
      }
    }
    else{
      this.contrubutors.push(e)
    }
    console.log(this.contrubutors)
  }

  // Set contributor
  setContributor() {
    this.createInteractiveVideoObj.spinner = true;
    let obj = {
      "videoID": this.mainID,
      "contributorID": this.contrubutors[0]
    };
    this.urlService.setContributor(obj).subscribe(
      success => {
       
        this.contrubutors.shift();
        if(this.contrubutors.length == 0){
          this.createInteractiveVideoObj.spinner = false;
          this.toastr.success('Contributor added');
          $('#contributor-Modal').modal('hide');
          this.isShareOpen = false;
          for(let i of this.followers)
          {
            i.setFollowerCheck = false
          }
          for(let i of this.following)
          {
            i.setFollowingCheck = false
          }
          
          
        }
        else{
          this.setContributor();
        }
       
      }, 
      error => {
        this.toastr.warning('Already contributor for this video');
        this.contrubutors.shift();
        if(this.contrubutors.length == 0){
          this.createInteractiveVideoObj.spinner = false;
          $('#contributor-Modal').modal('hide');
          this.isShareOpen = false;
        }
        else
        {
          this.setContributor();
        }
      });
  }

  //createInteractiveVideoObj.mainVideo.name

  onSelectFile(event) {
    this.spinner = true;
    const file = event.target.files;
    let existItem = [];
    
    if (file) {
      //let file = fileInput.target.files[0];
      
      for(let i of file){
        
          i.originalName = i.name.replace(/[{()}]/g, '').replace(/\s/g,'');
          i.originalName = i.originalName.trim();
          
          i.id = Math.random();
          i.uploadPercentage = 0;
         //console.log(event.target)
          this.onGetDuration(i).then((duration) => {
            // duration in seconds (as float)
            i.duration = duration;
            //var modifiedDate = event.target.files[i].lastModifiedDate;
             
              if (i.type.indexOf('image') > -1) {
                i.format = 'image';
              } else if (i.type.indexOf('video') > -1) {
                i.format = 'video';
              }
              this.uploadVideoObject.file.push(i)

              existItem = existItem.filter(function(item, pos) {
                return existItem.indexOf(item) == pos;
            })
          
              for(let i= this.uploadVideoObject.file.length-1; i>=1;i--){
                for(let j of existItem)
                {
                  if(this.uploadVideoObject.file[i].originalName == j){
                   
                    this.uploadVideoObject.file.splice(i,1);
                    break;
                  }
                }
              }
            
             
          });
    }
  
  }
  setTimeout(()=>{
  this.uploadVideo();
},2000)
  }


  uploadVideo() {
    this.toastr.info('Uploading!')
    this.spinner = true;
    // for(let i of this.uploadVideoObject.file)
    // {
  
      this.finalUpload(this.uploadVideoObject.file[0])
    // }
    
  }
  finalUpload(i)
  {

          let obj: any = { name: i.originalName, type: 'application/octet-stream', URL: null, duration: i.duration, thumbnail: '', size: i.size,originalName:i.name.split('.')[0]}

          this.urlService.createpresignedUrl(obj).subscribe(
            success => {
              i.counter = success.data.counter;
              this.uploadVideoObject.preSignedUrl = success.data.details
            // this.uploadVideoObject.selectedVideos = success.data
          
            this.urlService.uploadVideo(this.uploadVideoObject.preSignedUrl,i).subscribe(
              success =>{
                i.uploadPercentage = 0;
                let data: any = {name: i.originalName, counter: i.counter};
                this.toastr.info('Processing Video!') 
                this.transcodingJob(data,i)
                // On success call transcode video API
                // this.toastr.info('Video Processing!')
              },
              error =>{
                //this.uploadVideoObject.spinner = false;
                // let Obj:any = {name: i.originalName}
                // this.urlService.deletePresignedURL(Obj).subscribe(
                //   success =>{
                //     this.spinner = false;
                //     this.toastr.error('Uploading failed, Please try again!')
                //     this.uploadPercentage = 0
                //     this.isUploaded = false;
                //     return promise;
                //   })
              })

            
          
              this.progressPercentage(i)
            },
            error => {
              this.spinner = false;
              

            })
       
  }

progressPercentage(i)
{
  let interval =  setInterval(()=>{
    i.uploadPercentage =  this.urlService.getProgress()
    if( i.uploadPercentage > 99.9)
    {
      clearInterval(interval);
    }
  },1000)
}
transcodingJob(data,i){
  this.urlService.transcodeVideo(data).subscribe(
    success => {
      this.intialFunction('');
      this.readyToUpload=false;
      i.uploadPercentage = 0;
      i.isOtherone = true;
      let requestObj: any = {
        name: i.originalName,
        type: 'application/octet-stream',
        counter: i.counter,
        transcodeId: success.data.transcodeId
      };
      if (i.uploadPercentage) {
        i.uploadPercentage =   i.uploadPercentage + 10  
      }
      this.checkStatus(requestObj,i);
      
     
    }, error => {

    }
  );
}
checkStatus(requestObj,i)
{
    this.urlService.checkTranscodingStatus(requestObj).subscribe(
      success => {
        if (success.data._id != null || success.data._id != undefined) {
          
          this.toastr.info('Completed!');
          
            this.uploadVideoObject.file.shift();
            if(this.uploadVideoObject.file.length < 1){
              this.cancelUpload();
              this.callInitialList();
            this.spinner = false;
            this.finalCount =0;
            this.uploadedCount = 0;
            i.isOtherone = false;
            } 
            else{
            this.uploadVideo();
            this.spinner = false;
            i.isOtherone = false;
            }
          
          
        }
        else{
       setTimeout(()=>{
         if(i.uploadPercentage < 95)
         {
          i.uploadPercentage = i.uploadPercentage + 5;
         }
         else{
          i.uploadPercentage = 98;
         }
         
            this.checkStatus(requestObj,i);
        },1000)
      }
      
      },
      error =>{
        this.checkStatus(requestObj,i);
      }
    );
  
}

cancelUpload() {
  this.uploadVideoObject.file = [];
  $('video').trigger('pause');
  this.changeFilterUploadVideoVal = 'recentFirst';
  this.loadingVideo =  false;
  }
  callInitialList() {

    this.spinner = true;
    this.allUploadedVideo = [];
    this.loadingVideo = true;
    this.urlService.getUploadedVideo().subscribe(
      success => {
        this.allVideos = success.data
        for (let i of this.allVideos) {
          if(!!i.originalName)
          {
            i.name = i.originalName
          }          
            this.allUploadedVideo.push(i)
       }
        this.allUploadedVideo =  this.allUploadedVideo.reverse()
          this.loadingVideo =  false;
          this.spinner = false; 
       
        
      },
      error => {
        this.spinner = false;

      })
  }

  onGetDuration(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    let videoNode = document.createElement("video");
    let promise = new Promise(function(resolve, reject) {
      videoNode.addEventListener("loadedmetadata", function() {
        resolve(videoNode.duration);
      });
      videoNode.addEventListener("error", function() {
        reject(videoNode.error.message + "(" + videoNode.error.code + ")");
      });
    });
  
    const URL = window.URL;
    videoNode.src = URL.createObjectURL(file);
    videoNode.remove();
    return promise;
  }
  ngOnDestroy(): void {
   window.localStorage.removeItem('freeTemp')
    
  }
  selectedFile = null;

  onFileSelected(event)
  {
    this.selectedFile = event.target.files[0];
  }

  onUpload()
  {
    console.log(this.selectedFile); // You can use FormData upload to backend server
  }
}




