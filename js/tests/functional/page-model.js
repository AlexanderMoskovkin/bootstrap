import { Selector } from 'testcafe'

export class Accordion {
  constructor(selector) {
    this.mainElement = selector

    this.cards = this.mainElement.find('.card')
  }

  card(index) {
    const card   = this.cards.nth(index)
    const header = card.find('.card-header')
    const block  = card.find('.card-block')

    return {
      header,
      block
    }
  }
}

export class ModalDialog {
  constructor(selector) {
    this.mainElement = selector

    this.button                = this.mainElement.find('button').withText('button')
    this.linkWithTopTooltip    = this.mainElement.find('a[data-original-title="Tooltip on top"]')
    this.linkWithBottomTooltip = this.mainElement.find('a[data-original-title="Tooltip on bottom"]')
    this.accordion             = new Accordion(Selector('#accordion'))
    this.saveButton            = this.mainElement.find('button').withText('Save changes')
  }

  isVisible() {
    return this.mainElement.visible
  }
}

export class ModalDemoPage {
  constructor() {
    this.launchDemoModalBtn = Selector('button').withText('Launch demo modal')
    this.modalDialog        = new ModalDialog(Selector('.modal-dialog'))
    this.popoverTitle       = Selector('h3.popover-title')
    this.tooltip            = Selector('.tooltip')
  }
}
