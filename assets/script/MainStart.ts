/*
 * @Description: 试玩广告
 * @Author: hanyajun
 * @Date: 2024-06-26 13:05:52
 * @LastEditTime: 2024-06-26 16:54:46
 */

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

    // 竖屏
    private vecButton1: cc.Node = null;
    private vecButton2: cc.Node = null;
    private vecButton3: cc.Node = null;
    private vecButton4: cc.Node = null;
    private vecLight1: cc.Node = null;
    private vecLight2: cc.Node = null;
    private vecLight3: cc.Node = null;
    private vecLight4: cc.Node = null;
    private vecAnswer1: cc.Label = null;
    private vecAnswer2: cc.Label = null;
    private vecAnswer3: cc.Label = null;
    private vecAnswer4: cc.Label = null;
    private vecAnim: cc.Animation = null;
    private vecLevel: cc.Label = null;
    private vecTitle: cc.Label = null;
    private vecQuestion: cc.Label = null;

    // 横屏
    private hozButton1: cc.Node = null;
    private hozButton2: cc.Node = null;
    private hozButton3: cc.Node = null;
    private hozButton4: cc.Node = null;
    private hozLight1: cc.Node = null;
    private hozLight2: cc.Node = null;
    private hozLight3: cc.Node = null;
    private hozLight4: cc.Node = null;
    private hozAnswer1: cc.Label = null;
    private hozAnswer2: cc.Label = null;
    private hozAnswer3: cc.Label = null;
    private hozAnswer4: cc.Label = null;
    private hozAnim: cc.Animation = null;
    private hozLevel: cc.Label = null;
    private hozTitle: cc.Label = null;
    private hozQuestion: cc.Label = null;


    protected onLoad(): void {
        this.vec.active = false;
        this.hoz.active = false;
        // 竖屏
        this.vecButton1 = this.vecBottom.getChildByName('button1');
        this.vecButton2 = this.vecBottom.getChildByName('button2');
        this.vecButton3 = this.vecBottom.getChildByName('button3');
        this.vecButton4 = this.vecBottom.getChildByName('button4');
        this.vecLight1 = this.vecBottom.getChildByName('light1');
        this.vecLight2 = this.vecBottom.getChildByName('light2');
        this.vecLight3 = this.vecBottom.getChildByName('light3');
        this.vecLight4 = this.vecBottom.getChildByName('light4');
        this.vecAnswer1 = this.vecButton1.getChildByName('answer1').getComponent(cc.Label);
        this.vecAnswer2 = this.vecButton2.getChildByName('answer2').getComponent(cc.Label);
        this.vecAnswer3 = this.vecButton3.getChildByName('answer3').getComponent(cc.Label);
        this.vecAnswer4 = this.vecButton4.getChildByName('answer4').getComponent(cc.Label);
        this.vecAnim = this.vecBottom.getComponent(cc.Animation);
        this.vec.getChildByName
        this.vecLevel = this.vec.getChildByName('top').getChildByName('level').getComponent(cc.Label);
        this.vecTitle = this.vec.getChildByName('middle').getChildByName('title').getComponent(cc.Label);
        this.vecQuestion = this.vec.getChildByName('middle').getChildByName('question').getComponent(cc.Label);


        // 横屏
        this.hozButton1 = this.hozBottom.getChildByName('button1');
        this.hozButton2 = this.hozBottom.getChildByName('button2');
        this.hozButton3 = this.hozBottom.getChildByName('button3');
        this.hozButton4 = this.hozBottom.getChildByName('button4');
        this.hozLight1 = this.hozBottom.getChildByName('light1');
        this.hozLight2 = this.hozBottom.getChildByName('light2');
        this.hozLight3 = this.hozBottom.getChildByName('light3');
        this.hozLight4 = this.hozBottom.getChildByName('light4');
        this.hozAnswer1 = this.hozButton1.getChildByName('answer1').getComponent(cc.Label);
        this.hozAnswer2 = this.hozButton2.getChildByName('answer2').getComponent(cc.Label);
        this.hozAnswer3 = this.hozButton3.getChildByName('answer3').getComponent(cc.Label);
        this.hozAnswer4 = this.hozButton4.getChildByName('answer4').getComponent(cc.Label);
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
        let gameLanguage: string = "en";

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
