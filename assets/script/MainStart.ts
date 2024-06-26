
import { DataManager } from "./DataManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MainStart extends cc.Component {
    @property({
        type: cc.Node,
        displayName: '竖屏节点'
    })
    vec: cc.Node = null;

    @property({
        type: cc.Node,
        displayName: '横屏节点'
    })
    hoz: cc.Node = null;

    @property({
        type: cc.Node,
    })
    private vecBottom: cc.Node = null;

    @property({
        type: cc.Node,
    })
    private hozBottom: cc.Node = null;

    @property({
        type: cc.AudioSource,
        displayName: "bgm",
        tooltip: "背景音乐"
    })
    bgm: cc.AudioSource = null;

    @property({
        type: cc.Label,
    })
    private vecAnswer1: cc.Label = null;

    @property({
        type: cc.Label,
    })
    private vecAnswer2: cc.Label = null;

    @property({
        type: cc.Label,
    })
    private vecAnswer3: cc.Label = null;

    @property({
        type: cc.Label,
    })
    private vecAnswer4: cc.Label = null;

    @property({
        type: cc.Label,
    })
    private hozAnswer1: cc.Label = null;

    @property({
        type: cc.Label,
    })
    private hozAnswer2: cc.Label = null;

    @property({
        type: cc.Label,
    })
    private hozAnswer3: cc.Label = null;

    @property({
        type: cc.Label,
    })
    private hozAnswer4: cc.Label = null;

    // 竖屏
    private vecLight1: cc.Node = null;
    private vecLight2: cc.Node = null;
    private vecLight3: cc.Node = null;
    private vecLight4: cc.Node = null;
    private vecAnim: cc.Animation = null;
    private vecLevel: cc.Label = null;
    private vecTitle: cc.Label = null;
    private vecQuestion: cc.Label = null;

    // 横屏
    private hozLight1: cc.Node = null;
    private hozLight2: cc.Node = null;
    private hozLight3: cc.Node = null;
    private hozLight4: cc.Node = null;
    private hozAnim: cc.Animation = null;
    private hozLevel: cc.Label = null;
    private hozTitle: cc.Label = null;
    private hozQuestion: cc.Label = null;


    protected onLoad(): void {
        this.vec.active = false;
        this.hoz.active = false;
        // 竖屏
        this.vecLight1 = this.vecBottom.getChildByName('light1');
        this.vecLight2 = this.vecBottom.getChildByName('light2');
        this.vecLight3 = this.vecBottom.getChildByName('light3');
        this.vecLight4 = this.vecBottom.getChildByName('light4');
        this.vecAnim = this.vecBottom.getComponent(cc.Animation);
        this.vec.getChildByName
        this.vecLevel = this.vec.getChildByName('top').getChildByName('level').getComponent(cc.Label);
        this.vecTitle = this.vec.getChildByName('middle').getChildByName('title').getComponent(cc.Label);
        this.vecQuestion = this.vec.getChildByName('middle').getChildByName('question').getComponent(cc.Label);


        // 横屏
        this.hozLight1 = this.hozBottom.getChildByName('light1');
        this.hozLight2 = this.hozBottom.getChildByName('light2');
        this.hozLight3 = this.hozBottom.getChildByName('light3');
        this.hozLight4 = this.hozBottom.getChildByName('light4');
        this.hozAnim = this.hozBottom.getComponent(cc.Animation);
        this.hozLevel = this.hoz.getChildByName('top').getChildByName('level').getComponent(cc.Label);
        this.hozTitle = this.hoz.getChildByName('middle').getChildByName('title').getComponent(cc.Label);
        this.hozQuestion = this.hoz.getChildByName('middle').getChildByName('question').getComponent(cc.Label);
        this.initData();
        cc.view.setResizeCallback(this.canvasChange.bind(this));
        this.canvasChange();
    }

    private initData() {
        this.vecLight1.active = false;
        this.vecLight2.active = false;
        this.vecLight3.active = false;
        this.vecLight4.active = false;
        this.vecAnim.stop();

        this.hozLight1.active = false;
        this.hozLight2.active = false;
        this.hozLight3.active = false;
        this.hozLight4.active = false;
        this.hozAnim.stop();
        this.bgm.play();
        let gameLanguage: string = "pt";

        const lanData = DataManager[gameLanguage];
        if (lanData) {
            this.vecLevel.string = lanData.level;
            this.hozLevel.string = lanData.level;
            this.vecTitle.string = lanData.title;
            this.hozTitle.string = lanData.title;
            this.vecQuestion.string = lanData.question;
            this.hozQuestion.string = lanData.question;
            this.vecAnswer1.string = lanData.answer[0];
            this.vecAnswer2.string = lanData.answer[1];
            this.vecAnswer3.string = lanData.answer[2];
            this.vecAnswer4.string = lanData.answer[3];

            this.hozAnswer1.string = lanData.answer[0];
            this.hozAnswer2.string = lanData.answer[1];
            this.hozAnswer3.string = lanData.answer[2];
            this.hozAnswer4.string = lanData.answer[3];
        }
    }

    /**
     * @description: 点击事件
     * @return {*}
     */
    public onClick(): void {
        (window as any).openAppStore();
    }

    /**
     * @description: 屏幕适配
     * @return {*}
     */
    private canvasChange(): void {
        const visibleSize: cc.Size = cc.view.getVisibleSize();
        const designSize: cc.Size = cc.view.getDesignResolutionSize();
        if (visibleSize.height / visibleSize.width > designSize.height / designSize.width) {
            // 竖屏
            cc.view.setDesignResolutionSize(1080, 1920, cc.ResolutionPolicy.FIXED_WIDTH);
            this.vec.active = true;
            this.hoz.active = false;
            this.fingerAnimation(true);
        } else {
            // 横屏
            cc.view.setDesignResolutionSize(1920, 1080, cc.ResolutionPolicy.FIXED_HEIGHT);
            this.hoz.active = true;
            this.vec.active = false;
            this.fingerAnimation(false);
        }
    }

    private fingerAnimation(type: boolean): void {
        if (type) {
            // 竖屏
            this.vecAnim.play('vecAnimation');
            this.hozAnim.stop();
        } else {
            // 横屏
            this.vecAnim.stop();
            this.hozAnim.play('hozAnimation');
        }
        this.schedule(() => {
            console.log('用户无操作!!!');
            this.unscheduleAllCallbacks();
            this.onClick();
        }, 22);
    }
}
