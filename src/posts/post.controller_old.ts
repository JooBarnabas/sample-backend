import express, {Request, Response} from 'express';
import Post from './post.interface';
import IController from "../interfaces/controller.interface";
 
export default class PostsController implements IController {
  public path = '/posts';
  public router = express.Router();
 
  private posts: Post[] = [
    {
      author: 'Marcin',
      content: 'Dolor sit amet',
      title: 'Lorem Ipsum',
    }
  ];
 
  constructor() {
    this.intializeRoutes();
  }
 
  public intializeRoutes() {
    this.router.get(this.path, this.getAllPosts);
    this.router.post(this.path, this.createAPost);
  }
 
  getAllPosts = (request: Request, response: Response) => {
    response.send(this.posts);
  }
 
  createAPost = (request: Request, response: Response) => {
    const post: Post = request.body;
    this.posts.push(post);
    response.send(this.posts);
  }
}