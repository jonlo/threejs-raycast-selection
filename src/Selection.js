/**
 * 
 * @module threejs-raycast-selection
 * @class Selection
 * @author jon
 * @version 1
 **/
import { Scene, Raycaster } from 'three';

/**
 * Creates an instance of Selection.
 * @public
 * @name constructor
 * @function constructor
 * @param {Camera}camera 
 **/
export class Selection {
	constructor(camera) {
		this.camera = camera;
		this.raycaster = new Raycaster();
	}

/**
 * Returns the element with the lowest userData.selectionIndex value in the intersections from a raycast
 * 
 * @public
 * @name selectElement
 * @function selectElement
 * @param {Vector2}mousePosNormalized
 * @param {Array}allElements
 **/
	selectElement(mousePosNormalized, allElements) {
		var intersects = this._raycastHits(this.camera, mousePosNormalized, allElements);
		let selectedElement;
		if (intersects.length > 0) {
			if (!(intersects[0].object.parent instanceof Scene)) {
				selectedElement = intersects[0].object.parent;
			} else {
				selectedElement = intersects[0].object;
			}
			try {
				let min = Math.min.apply(Math, intersects.map((intersect) => { return intersect.object.userData.selectionIndex; }));
				var firstElementAtIndex = intersects.find(function (o) { return o.object.userData.selectionIndex.y == min; });
				if (firstElementAtIndex) {
					selectedElement = firstElementAtIndex.object;
				}
			} catch (error) {
				console.log(error);
			}

			return selectedElement;
		}
	}

	_raycastHits(camera, mousePos, colliders) {
		this.raycaster.setFromCamera(mousePos, camera);
		let intersects = this.raycaster.intersectObjects(colliders.filter(element => element.userData.transformData.selectable));
		return intersects;
	}

}