import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { UserCredential } from 'src/app/enums/User.credentials.enum';

@Directive({
  selector: '[appAdminOnly]',
  standalone:true,
})
export class AdminOnlyDirective {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService
  ) {}

  @Input() set appAdminOnly(condition: boolean) {
    const user = this.authService.getCurrentUserFromLocalStorage();

    if (user && user.role === UserCredential.ADMIN && condition) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
