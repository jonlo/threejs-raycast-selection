# threejs-raycast-selection

Very simple package to get a threejs element from a raycast

## Quick Start

```javascript
import { Selection } from 'threejs-raycast-selection';

let selection = new Selection(camera);

selection.addSelectableObject(object);

let selectedElement = selection.selectElement(mousePosNormalized);

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
<dt><a href="#selectElement">selectElement(mousePosNormalized)</a></dt>
<dd><p>Returns the element with the lowest userData.selectionIndex value in the intersections from a raycast</p>
</dd>
<dt><a href="#addSelectableObject">addSelectableObject(object)</a></dt>
<dd><p>Adds a Object3d to the selection system, including all its children meshes</p>
</dd>
<dt><a href="#removeSelectableObject">removeSelectableObject(object)</a></dt>
<dd><p>Removes all the meshes of an Object3d from the selection system</p>
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

| Param | Type |
| --- | --- |
| camera | <code>Camera</code> |

<a name="selectElement"></a>

## selectElement(mousePosNormalized)
Returns the element with the lowest userData.selectionIndex value in the intersections from a raycast

**Kind**: global function
**Access**: public

| Param | Type |
| --- | --- |
| mousePosNormalized | <code>Vector2</code> |

<a name="addSelectableObject"></a>

## addSelectableObject(object)
Adds a Object3d to the selection system, including all its children meshes

**Kind**: global function
**Access**: public

| Param | Type |
| --- | --- |
| object | <code>Object3d</code> |

<a name="removeSelectableObject"></a>

## removeSelectableObject(object)
Removes all the meshes of an Object3d from the selection system

**Kind**: global function
**Access**: public

| Param | Type |
| --- | --- |
| object | <code>Object3d</code> |