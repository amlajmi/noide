var w = window
var d = document

function splitter (handle, collapseNextElement, onEndCallback) {
  var last
  var horizontal = handle.classList.contains('horizontal')
  var el1 = handle.previousElementSibling
  var el2 = handle.nextElementSibling
  var collapse = collapseNextElement ? el2 : el1
  var toggle = document.createElement('a')
  toggle.classList.add('toggle')
  handle.appendChild(toggle)

  function onDrag (e) {
    if (horizontal) {
      var hT, hB
      var hDiff = e.clientY - last

      hT = d.defaultView.getComputedStyle(el1, '').getPropertyValue('height')
      hB = d.defaultView.getComputedStyle(el2, '').getPropertyValue('height')
      hT = parseInt(hT, 10) + hDiff
      hB = parseInt(hB, 10) - hDiff
      el1.style.height = hT + 'px'
      el2.style.height = hB + 'px'
      last = e.clientY
    } else {
      var wL, wR
      var wDiff = e.clientX - last

      wL = d.defaultView.getComputedStyle(el1, '').getPropertyValue('width')
      wR = d.defaultView.getComputedStyle(el2, '').getPropertyValue('width')
      wL = parseInt(wL, 10) + wDiff
      wR = parseInt(wR, 10) - wDiff
      el1.style.width = wL + 'px'
      el2.style.width = wR + 'px'
      last = e.clientX
    }
  }

  function onEndDrag (e) {
    e.preventDefault()
    w.removeEventListener('mousemove', onDrag)
    w.removeEventListener('mouseup', onEndDrag)
    if (onEndCallback) {
      onEndCallback()
    }
    // noide.editor.resize()
    // var processes = require('./processes')
    // processes.editor.resize()
  }

  handle.addEventListener('mousedown', function (e) {
    e.preventDefault()

    if (e.target === toggle) {
      collapse.style.display = collapse.style.display === 'none' ? 'block' : 'none'
    } else if (collapse.style.display !== 'none') {
      last = horizontal ? e.clientY : e.clientX

      w.addEventListener('mousemove', onDrag)
      w.addEventListener('mouseup', onEndDrag)
    }
  })
  // handle.addEventListener('click', function (e) {
  //   e.preventDefault()
  //   e.stop
  //
  //   last = horizontal ? e.clientY : e.clientX
  //
  //   w.addEventListener('mousemove', onDrag)
  //   w.addEventListener('mouseup', onEndDrag)
  // })
}

module.exports = splitter
