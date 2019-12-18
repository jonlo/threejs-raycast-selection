# threejs-raycast-selection

Very simple package to get a threejs element from a raycast

## Quick Start

```javascript
import { Selection } from 'threejs-raycast-selection';

let selection = new Selection(camera);

let selectedElement = selection.selectElement(mousePosNormalized, allElements);

//Or

selection.subscribe('elementSelected', (params) => { this.elementSelected(params); });

```
### params

```javascript
{
	selectedElement: selectedElement
}
```
## Classes

<dl>
<dt><a href="#Selection">Selection</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#constructor">constructor(camera)</a></dt>
<dd><p>Creates an instance of Selection.</p>
</dd>
<dt><a href="#selectElement">selectElement(mousePosNormalized, allElements)</a></dt>
<dd><p>Returns the element with the lowest userData.selectionIndex value in the intersections from a raycast</p>
</dd>
</dl>

<a name="Selection"></a>

## Selection
**Kind**: global class
**Version**: 1
**Author**: jon
<a name="constructor"></a>

## constructor(camera)
Creates an instance of Selection.

**Kind**: global function
**Access**: public

| Param  | Type                |
| ------ | ------------------- |
| camera | <code>Camera</code> |

<a name="selectElement"></a>

## selectElement(mousePosNormalized, allElements)
Returns the element with the lowest userData.selectionIndex value in the intersections from a raycast

**Kind**: global function
**Access**: public

| Param              | Type                 |
| ------------------ | -------------------- |
| mousePosNormalized | <code>Vector2</code> |
| allElements        | <code>Array</code>   |