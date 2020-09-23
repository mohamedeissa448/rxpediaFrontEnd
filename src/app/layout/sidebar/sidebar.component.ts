import { AuthService } from "./../../authentication/services/auth.service";
import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
  OnInit
} from "@angular/core";
import { ThemeService } from "../../services/theme.service";
import { AnalyticService } from "../../services/analytic.service"
import { takeUntil } from "rxjs/operators";
import { Subject, from } from "rxjs";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"]
})
export class SidebarComponent implements OnDestroy, OnInit {
  @Input() sidebarVisible: boolean = true;
  @Input() navTab: string = "menu";
  @Input() currentActiveMenu;
  @Input() currentActiveSubMenu;
  @Output() changeNavTabEvent = new EventEmitter();
  @Output() activeInactiveMenuEvent = new EventEmitter();
  public themeClass: string = "theme-cyan";
  public darkClass: string = "";
  private ngUnsubscribe = new Subject();
  AnalityicData: any;
  constructor(
    private authService: AuthService,
    private themeService: ThemeService,
    private AnalyticService: AnalyticService
  ) {
    this.themeService.themeClassChange
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(themeClass => {
        this.themeClass = themeClass;
      });
    this.themeService.darkClassChange
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(darkClass => {
        this.darkClass = darkClass;
      });
  }
  
  ngOnInit(){
    this.AnalityicData ={MiniData:[0,0]}
    this.AnalyticService.currentUserMiniData.subscribe(dataByService => this.AnalityicData = dataByService);
    this.AnalyticService.getUserMiniData();
  }
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  changeNavTab(tab: string) {
    this.navTab = tab;
  }

  activeInactiveMenu(menuItem: string) {
    this.activeInactiveMenuEvent.emit({ item: menuItem });
  }

  changeTheme(theme: string) {
    this.themeService.themeChange(theme);
  }

  changeDarkMode(darkClass: string) {
    this.themeService.changeDarkMode(darkClass);
  }
}
