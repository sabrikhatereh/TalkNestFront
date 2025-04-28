import { Routes } from '@angular/router';
import { PostsComponent } from './components/posts/posts.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';

export const routes: Routes = [
  { path: '', component: PostsComponent },
  { path: 'post/:id', component: PostDetailComponent }
];
