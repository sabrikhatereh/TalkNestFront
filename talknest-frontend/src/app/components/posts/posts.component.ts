import { Component, OnInit } from '@angular/core';
import { PostService ,Post} from '../../services/post.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  standalone: true,
  imports: [CommonModule,FormsModule],
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];
  newPost: Partial<Post> = {};

  constructor(private postService: PostService, private router: Router) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts() {
    this.postService.listPosts().subscribe(response => {
      console.log(response)

      this.posts = response;
    });
  }

  createPost() {
    this.postService.createPost(this.newPost).subscribe(() => {
      this.newPost = {};
      this.loadPosts();
    });
  }

  goToPost(post: Post) {
    this.router.navigate(['/post', post.id]);
  }
}
