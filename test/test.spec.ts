import Board from '../src/Model/Board'
import BoardController from '../src/Controller/BoardController'
import View from '../src/View/View'
import * as $ from 'jquery'
import {
	expect
} from 'chai';

describe('Board Action', () => {


	beforeEach(() => {
		const canvas = document.createElement('canvas');
		canvas.classList.add('game__board');
		canvas.setAttribute('width', '990');
		canvas.setAttribute('height', '500');
		document.body.appendChild(canvas);

		const buttons = ['game__btn_play', 'game__btn_pause', 'game__btn_clear'];
		buttons.forEach((name) => {
			const elem = document.createElement('button');
			elem.classList.add(name);
			document.body.appendChild(elem);
		});

		const inputs = ['game__board-width', 'game__board-height'];
		inputs.forEach((name) => {
			const elem = document.createElement('input');
			elem.classList.add(name);
			document.body.appendChild(elem);
		});
	});



	it('Обработка клика по клетке', () => {

		const controller = new BoardController();
		const canvas = document.getElementsByClassName('game__board')[0];

		function click(el) {
			let ev = document.createEvent("MouseEvent");
			ev.initMouseEvent(
				"click",
				true, true,
				window, null,
				25, 133, 27, 135,
				false, false, false, false,
				0, null
			);
			el.dispatchEvent(ev);
		}

		click(canvas);

		expect([
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		]).to.deep.equal(controller.board.board);
	});


	it('Получение следующего поколения', () => {

		const controller = new BoardController();

		const preset = [
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		];
		const nextGen = [
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		];
		controller.board.preset(preset);

		expect(nextGen).to.deep.equal(controller.board.getNextGen());
	});

	it('Изменение ширины по unfocus', () => {

		const controller = new BoardController();

		const input_width = $('.game__board-width');
		input_width.trigger('focus');
		input_width.val('5')
		input_width.trigger('blur');

		expect([
			[0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0]
		]).to.deep.equal(controller.board.board);
	});


	it('Изменение высоты по unfocus', () => {

		const controller = new BoardController();

		const input_height = $('.game__board-height');
		input_height.trigger('focus');
		input_height.val('5')
		input_height.trigger('blur');

		expect([
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		]).to.deep.equal(controller.board.board);
	});

	it('Получение не числа в инпуты ширины/высоты', () => {

		const controller = new BoardController();

		const input_height = $('.game__board-height');
		input_height.trigger('focus');
		input_height.val('f')
		input_height.trigger('blur');

		expect(10).to.equal(controller.board.rows);
		expect(10).to.equal(controller.board.cols);
	});

	it('Блокировка клавиши Play после нажатия', () => {

		const controller = new BoardController();

		const button_play = $('.game__btn_play');
		button_play.trigger('click');
		expect('disabled').to.equal(button_play.attr('disabled'));
	});

	it('Блокировка клавиши Pause после нажатия', () => {

		const controller = new BoardController();

		const button_pause = $('.game__btn_pause');
		button_pause.trigger('click');
		expect('disabled').to.equal(button_pause.attr('disabled'));
	});

	it('Разблокировка Play после нажатия на Pause', () => {

		const controller = new BoardController();

		const button_play = $('.game__btn_play');
		const button_pause = $('.game__btn_pause');
		button_play.trigger('click');
		expect('disabled').to.equal(button_play.attr('disabled'));
		button_pause.trigger('click');
		expect(undefined).to.equal(button_play.attr('disabled'));
	});

	afterEach(() => {
		document.body.innerHTML = '';
	});


});