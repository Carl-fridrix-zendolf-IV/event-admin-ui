import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AppComponent } from '../../app.component';
import { GetMessages, PutMessage } from '../../services/http';
declare var io: any;


@Component({
    selector: 'chat-detail',
    templateUrl: './chats.detail.html',
    styleUrls: ['./chats.detail.css']
})
export class ChatDetailComponent {
    @ViewChild('messagesContainer') el:ElementRef;

    private messages: Array<any>;
    private room: string;
    private message: string;
    private user: any;
    private loading: boolean;

    constructor (private loadMessage: GetMessages, private putMessage: PutMessage, private route: ActivatedRoute, private router: Router) {
        if (!localStorage.getItem('SPEAKER_RN_BANK'))
            this.router.navigate(['chats']);
        else
            this.user = JSON.parse(localStorage.getItem('SPEAKER_RN_BANK'));
    }

    ngOnInit () {
        this.route.params.subscribe((params) => {
            this.room = params['id'].toString();
            this.loadMessage.request(params['id'].toString()).subscribe(data => {
                this.messages = data;

                this.scrollToBottom();
                this.initSocket();
            }, err => {
                this.messages = new Array();
            })
        })
    }

    initSocket () {
        var socket = io(AppComponent.API_URL, {query: 'chat=' + this.room});
        socket.on('connect', () => {
            console.log(socket.id);

            socket.on('NEW_CHAT_MESSAGE', (data: any) => {
                this.messages.push(data);
                this.scrollToBottom();
            });
        });
    }

    scrollToBottom () {
        setTimeout(() => { this.el.nativeElement.scrollTop = this.el.nativeElement.scrollHeight; }, 0);
    }

    sendMessage () {
        this.loading = true;

        let message = {
            message: this.message,
            room: this.room,
            sender: this.user._id,
            eventName: 'RN_BANK'
        }

        // this.sendDisable = true;
        this.putMessage.request(message).subscribe(data => {
            this.message = null;
            this.loading = false;
            // this.sendDisable = false;
        }, err => {
            this.loading = false;
            // this.sendDisable = false;
        })
    }
}
