'use strict';

import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

export default class Preloader {
	constructor() {
		this.time = 3000;
		this.preloader = document.getElementById('preloader');
		if(this.preloader) {
			this.show();
			setTimeout(() => this.hide(), this.time);
		}
	}

	show() {
		this.preloader.classList.add('preloader_active');
		disableBodyScroll(this.preloader);
	}

	hide() {
		document.body.classList.remove('body_hidden');
		this.preloader.classList.remove('preloader_active');
		enableBodyScroll(this.preloader);
	}
}