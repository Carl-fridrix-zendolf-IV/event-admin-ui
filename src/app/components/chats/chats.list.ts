import { Component } from '@angular/core';
import { GetChats, GetSpeakers } from '../../services/http';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
    selector: 'chat',
    templateUrl: './chats.list.html',
    styleUrls: ['./chats.list.css']
})
export class ChatComponent {
    private speakers: Array<any>;
    private chats: Array<any>;
    private showPopup: boolean;
    private speaker: any = 0;

    constructor (private loadChats: GetChats, private loadSpeakers: GetSpeakers, private route: ActivatedRoute, private router: Router) {
        if (!localStorage.getItem('SPEAKER_RN_BANK')) {
            this.loadSpeakersList();
            this.loadChatsList();
            this.showPopup = true;
        }
        else {
            this.showPopup = false;
            this.loadChatsList();
        }
    }

    loadSpeakersList () {
        this.loadSpeakers.request().subscribe(data => {
            this.speakers = data;
        }, err => {
            this.speakers = new Array();
        })
    }

    selectSpeaker () {
        if (!this.speaker)
            return;

        var user = this.speakers.filter((item) => { return item._id === this.speaker; })
        localStorage.setItem('SPEAKER_RN_BANK', JSON.stringify(user[0]));

        this.showPopup = false;
    }

    loadChatsList () {
        this.loadChats.request().subscribe(data => {
            this.chats = data;
        }, () => {
            this.chats = new Array();
        })
    }

    openChat (chat: any) {
        this.router.navigate(['chats', chat._id.toString()]);
    }
}
