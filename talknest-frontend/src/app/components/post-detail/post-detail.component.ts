import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService, Post, Comment} from '../../services/post.service';
import { CommentService } from '../../services/comment.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { Location } from '@angular/common';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  imports: [CommonModule,FormsModule],
})
export class PostDetailComponent implements OnInit {
  postId!: string;
  post?: Post;
  newComment: string = '';

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private commentService: CommentService,
    private location: Location,
  ) {}

  ngOnInit(): void {
    this.postId = this.route.snapshot.paramMap.get('id')!;
    this.loadPost();
  }

  loadPost() {
    this.postService.getPost(this.postId).subscribe(response => {
      this.post = response;
      console.log(response)
    });
  }

  goBack(): void {
    this.location.back();
  }

  addComment() {
    if (!this.newComment) return;
  
    var commentPayload =  {
      postId: this.postId,
      text: this.newComment
    };
  
    this.commentService.addComment(commentPayload).subscribe(() => {
      this.newComment = '';
      this.loadPost();
    });
  }
}
