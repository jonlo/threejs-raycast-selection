/**
 * 
 * @module threejs-raycast-selection
 * @class Selection
 * @author jon
 * @version 1
 **/
import { Raycaster } from 'three';
import { EventManager } from 'smaw-event-manager';
import { SelectionData } from './SelectionData';

/**
 * Creates an instance of Selection.
 * @public
 * @name constructor
 * @function constructor
 * @param {Camera}camera 
 **/
export class Selection {

	constructor(camera) {
		EventManager.call(this);
		this.selectableObjects = [];
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
	 * @return {{selectedElement: Mesh, parent: Object3d , intersectionPoint: Vector3}} 
 	 * The selected mesh, it's parent and the raycastHit point
	 **/
	selectElement(mousePosNormalized) {
		var intersects = this._raycastHits(this.camera, mousePosNormalized, this.selectableObjects);
		let selectedElement;
		if (intersects.length > 0) {
			selectedElement = intersects[0];
			try {
				let min = Math.min.apply(Math, intersects.map((intersect) => { return intersect.object.userData.selectionIndex; }));
				var firstElementAtIndex = intersects.find(function (o) { return o.object.userData.selectionIndex == min; });
				if (firstElementAtIndex) {
					selectedElement = firstElementAtIndex;
				}
			} catch (error) {
				console.log(error);
			}
			this.trigger('elementSelected', {
				selectedElement: selectedElement.object,
				parent: selectedElement.object.userData.selectionData.rootParent,
				intersectionPoint: selectedElement.point
			});
			return {
				selectedElement: selectedElement.object,
				parent: selectedElement.object.userData.selectionData.rootParent,
				intersectionPoint: selectedElement.point
			};
		}
	}

	/**
	 * Adds an Object3d to the selection system, including all its children meshes
	 * 
	 * @public
	 * @name addSelectableObject
	 * @function addSelectableObject
	 * @param {Object3d}object
	 **/
	addSelectableObject(object) {
		object.traverse((mesh) => {
			if ((mesh.type === 'Mesh')) {
				mesh.userData.selectionData = new SelectionData(object, true);
				this.selectableObjects.push(mesh);
			}
		});
	}

	/**
	 * Removes an Object3d from the selection system 
	 * 
	 * @public
	 * @name removeSelectableObject
	 * @function removeSelectableObject
	 * @param {Object3d}object
	 **/
	removeSelectableObject(object) {
		let objectMeshes = this.selectableObjects.filter(mesh => mesh.userData.selectionData.rootParent.uuid === object.uuid);
		objectMeshes.forEach((mesh) => {
			var index = this.selectableObjects.indexOf(mesh);
			if (index > -1) {
				this.selectableObjects.splice(index, 1);
			}
		});
	}

	/**
	 * Clears all the selectable objects list
	 * 
	 * @public
	 * @name clearSelectableObjects
	 * @function clearSelectableObjects
	 **/
	clearSelectableObjects(){
		this.selectableObjects = [];
	}

	_raycastHits(camera, mousePos, colliders) {
		this.raycaster.setFromCamera(mousePos, camera);
		let intersects = this.raycaster.intersectObjects(colliders.filter(element => element.userData.selectionData.selectable));
		return intersects;
	}

}