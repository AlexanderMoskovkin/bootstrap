import { Selector } from 'testcafe';

fixture `Bootstrap - Modal`
    .page `http://localhost:3000/js/tests/visual/modal.html`;

class Accordion {
    constructor (selector) {
        this.mainElement = selector;

        this.cards = this.mainElement.find('.card');
    }

    card (index) {
        const card   = this.cards.nth(index);
        const header = card.find('.card-header');
        const block  = card.find('.card-block');

        return { header, block };
    }
}

class ModalDialog {
    constructor (selector) {
        this.mainElement = selector;

        this.button                = this.mainElement.find('button').withText('button');
        this.linkWithTopTooltip    = this.mainElement.find('a[data-original-title="Tooltip on top"]');
        this.linkWithBottomTooltip = this.mainElement.find('a[data-original-title="Tooltip on bottom"]');
        this.accordion             = new Accordion(Selector('#accordion'));
        this.saveButton            = this.mainElement.find('button').withText('Save changes');
    }

    isVisible () {
        return this.mainElement.visible;
    }
}

class ModalDemoPage {
    constructor () {
        this.launchDemoModalBtn = Selector('button').withText('Launch demo modal');
        this.modalDialog        = new ModalDialog(Selector('.modal-dialog'));
        this.popoverTitle       = Selector('h3.popover-title');
        this.tooltip            = Selector('.tooltip');
    }
}


test('Test Modal page', async t => {
    const page = new ModalDemoPage();

    // Check modal dialog is hidden
    await t
        .expect(page.modalDialog.isVisible()).ok()
        .expect(page.modalDialog.isVisible()).notOk()
        .wait(100);

    // Open modal dialog
    await t
        .click(page.launchDemoModalBtn)
        .expect(page.modalDialog.isVisible()).ok();

    // Click on the button and check popover
    await t
        .click(page.modalDialog.button)
        .expect(page.popoverTitle.visible).ok()
        .expect(page.popoverTitle.textContent).eql('Popover title');

    // Check links with tooltips.
    await t
        .expect(page.tooltip.count).eql(0)
        .hover(page.modalDialog.linkWithTopTooltip)
        .expect(page.tooltip.count).eql(1)
        .expect(page.tooltip.textContent).eql('Tooltip on top')
        .hover(page.tooltip)
        .expect(page.tooltip.count).eql(0)

        .hover(page.modalDialog.linkWithBottomTooltip)
        .expect(page.tooltip.count).eql(1)
        .expect(page.tooltip.textContent).eql('Tooltip on bottom')
        .hover(page.tooltip)
        .expect(page.tooltip.count).eql(0);

    // Check accordion
    const accordion = page.modalDialog.accordion;

    const firstCardBlockHeight = await accordion.card(0).block.offsetHeight;
    console.log(firstCardBlockHeight);

    await t
        .expect(firstCardBlockHeight).gt(0)
        .click(accordion.card(0).header)
        .expect(accordion.card(0).block.offsetHeight).eql(0);

    const firstCardBlockHeight1 = await accordion.card(0).block.offsetHeight;
    console.log(firstCardBlockHeight1);

    await t.click(accordion.card(0).header)
        .expect(accordion.card(0).block.offsetHeight).eql(firstCardBlockHeight);

    const firstCardBlockHeight2 = await accordion.card(0).block.offsetHeight;
        console.log(firstCardBlockHeight2);
    // Close modal dialog
    await t
        .click(page.modalDialog.saveButton)
        .expect(page.modalDialog.visible).notOk()
        .expect(page.popoverTitle.visible).notOk();
});