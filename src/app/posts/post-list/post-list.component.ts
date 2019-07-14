import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import {Post} from '../post.model'
import{PostService} from '../posts.service'
import { Subscription } from 'rxjs'
@Component({
    selector:'app-post-list',
    templateUrl:'./post-list.component.html',
    styleUrls:['./post-list.component.css']
})

export class PostListComponent implements OnInit,OnDestroy{
    posts:Post[]=[]
    private postsSub:Subscription
    isLoading=false
    constructor(public postService:PostService){

    }
    ngOnDestroy(){
        this.postsSub.unsubscribe()
    }
    ngOnInit(){
        this.isLoading=true
        this.postService.getPosts()
        this.postsSub=this.postService.getPostUpdateListener()
            .subscribe((posts:Post[])=>{
                this.isLoading=false
                this.posts=posts
            })
    }
    onDelete(postId:String){
        this.postService.onDeletePost(postId)
    }
}