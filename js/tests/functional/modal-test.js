import { ModalDemoPage } from './page-model'

fixture('Bootstrap - Modal')
  .page('http://localhost:3000/js/tests/visual/modal.html')

test('Modal page', async (t) => {
  const page = new ModalDemoPage()
  const MODAL_POPAP_BLINKING_WAITING = 100

  // When the tested page is opened modal dialog appears for a moment and became hidden then
  await t
    .expect(page.modalDialog.isVisible()).ok()
    .expect(page.modalDialog.isVisible()).notOk()
    .wait(MODAL_POPAP_BLINKING_WAITING)

  // Open modal dialog
  await t
    .click(page.launchDemoModalBtn)
    .expect(page.modalDialog.isVisible()).ok()

  // Click on the button and check popover
  await t
    .click(page.modalDialog.button)
    .expect(page.popoverTitle.visible).ok()
    .expect(page.popoverTitle.textContent).eql('Popover title')

  // Check links with tooltips.
  await t
    .expect(page.tooltip.count)
    .eql(0)
    .hover(page.modalDialog.linkWithTopTooltip)
    .expect(page.tooltip.count)
    .eql(1)
    .expect(page.tooltip.textContent)
    .eql('Tooltip on top')
    .hover(page.tooltip)
    .expect(page.tooltip.count)
    .eql(0)

    .hover(page.modalDialog.linkWithBottomTooltip)
    .expect(page.tooltip.count)
    .eql(1)
    .expect(page.tooltip.textContent)
    .eql('Tooltip on bottom')
    .hover(page.tooltip)
    .expect(page.tooltip.count)
    .eql(0)

  // Check accordion
  const accordion = page.modalDialog.accordion

  await t
    .expect(accordion.card(0).block.offsetHeight)
    .gt(0)
    .expect(accordion.card(1).block.offsetHeight)
    .eql(0)
    .click(accordion.card(1).header)
    .expect(accordion.card(0).block.offsetHeight)
    .eql(0)
    .expect(accordion.card(1).block.offsetHeight)
    .gt(0)
    .click(accordion.card(0).header)
    .expect(accordion.card(0).block.offsetHeight)
    .gt(0)
    .expect(accordion.card(1).block.offsetHeight)
    .eql(0)

  // Close modal dialog
  await t
    .click(page.modalDialog.saveButton)
    // .expect(page.modalDialog.isVisible()).notOk()
    // .expect(page.popoverTitle.visible).notOk();
})
