import { IntentApplicationContext, ServiceProvider } from '@intentjs/core';
import { BlogDbRepository, UserDbRepository } from 'app/repositories';
import { AuthService, CommonService, MailService, UserService } from 'app/services';
import { BlogService } from 'app/services/blog';

export class AppServiceProvider extends ServiceProvider {
  /**
   * Register any application services here.
   */
  register() {
    /**
     * Binding the UserService with the application.
     *
     * Read more - https://tryintent.com/docs/providers
     */

    this.bind(AuthService);
    this.bind(UserService);
    this.bind(BlogService);
    this.bind(CommonService);
    this.bind(MailService);
    /**
     * Binding the UserDbRepository with a non-class based token 'USER_DB_REPO'.
     *
     * Read more - https://tryintent.com/docs/providers#class-based-providers
     */
    this.bindWithClass('USER_DB_REPO', UserDbRepository);
    this.bindWithClass('BLOG_DB_REPO', BlogDbRepository);
  }

  /**
   * Bootstrap any application service here.
   */
  boot(app: IntentApplicationContext) { }
}
