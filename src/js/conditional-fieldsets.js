/*
* Conditional fieldsets
* Associate fieldsets (or other elements) to radio buttons or checkboxes
*/
(function() {
	'use strict';

	// 
	const attributes = {
		trigger: 'data-has-conditional-fieldset',
		fieldset: 'data-conditional-fieldset',
		fieldsetId: 'data-conditional-fieldset-id',
		groupId: 'data-conditional-group-id',
		inverse: 'data-conditional-inverse',
		wasRequired: 'data-conditional-was-required'
	};
	const classes = {
		hiddenSet: 'o-conditional-fieldset--is-hidden'
	};

	let triggers;


	/**
	* show a fieldset and add required fields to validation
	* @param {html element} fieldset - The container to show
	* @returns {undefined}
	*/
	const showFieldset = (fieldset) => {
		fieldset.classList.remove(classes.hiddenSet);
	}
	
	
	/**
	 * hide a fieldset and remove required fields from validation
	 * @param {html element} fieldset - The container to hide
	* @returns {undefined}
	*/
	const hideFieldset = (fieldset) => {
		fieldset.classList.add(classes.hiddenSet);
	}


	/**
	* hide all inactive members of a conditional group
	* @param {string} groupId - the id of the group to hide
	* @param {html element} fieldset - The fieldset associated with current trigger
	* @returns {undefined}
	*/
	const hideGroupMembers = (groupId, fieldset) => {
		// find all triggers with same groupId
		const groupTriggersSelector = `[${attributes.trigger}][${attributes.groupId}="${groupId}"]`;
		const groupTriggers = Array.from(document.querySelectorAll(groupTriggersSelector));

		groupTriggers.forEach((trigger) => {
			const fieldsetToHide = getFieldsetByTrigger(trigger);
			if (fieldsetToHide !== fieldset) {
				hideFieldset(fieldsetToHide);
			}
		});
	};


	/**
	* get the fieldset associated with a trigger
	* @param {html element} trigger - The trigger whose fieldset to find
	* @returns {undefined}
	*/
	const getFieldsetByTrigger = (trigger) => {
		const fieldsetId = trigger.getAttribute(attributes.fieldsetId);
		const currFieldsetSelector = `[${attributes.fieldset}][${attributes.fieldsetId}="${fieldsetId}"]`;
		const currFieldset = document.querySelector(currFieldsetSelector);// for simplicity, assume there will be only one fieldset associated with trigger

		return currFieldset;
	};


	/**
	* handle a trigger being changed
	* @param {event} event - Change event on trigger (radio or checkbox)
	* @returns {undefined}
	*/
	const triggerHandler = (event) => {
		const trigger = event.currentTarget;
		const currFieldset = getFieldsetByTrigger(trigger);
		const inverse = trigger.getAttribute(attributes.inverse) === "true";
		
		// do we need to show or hide the fieldset?
		let show = trigger.checked;
		if (inverse) {
			show = !show;
		}

		// check a conditional group is associated with the trigger
		const conditionalGroupId = trigger.getAttribute(attributes.groupId);
		if (conditionalGroupId !== null) {
			hideGroupMembers(conditionalGroupId, currFieldset);
		}

		// now show the conditional fieldset
		if (show) {
			showFieldset(currFieldset);
		} else {
			hideFieldset(currFieldset);
		}

		updateAllFieldsetValidation();
	};


	/**
	* initialize the conditional triggers
	* @returns {undefined}
	*/
	const initTriggers = () => {
		triggers.forEach((trigger) => {
			trigger.addEventListener('change', triggerHandler);
		});
	};


	/**
	* update the validation for a fieldset
	* @param {html element} fieldset - The element in which to update the fields
	* @returns {undefined}
	*/
	const updateFieldsetValidation = (fieldset) => {
		const isHidden = fieldset.classList.contains(classes.hiddenSet);
		const requiredElements = Array.from(fieldset.querySelectorAll(`[required], [${attributes.wasRequired}]`));

		requiredElements.forEach((elm) => {
			if (isHidden) {
				elm.setAttribute(attributes.wasRequired, 'true');
				elm.removeAttribute('required');
			} else {
				elm.setAttribute('required', 'required');
				elm.removeAttribute(attributes.wasRequired, 'true');
			}
		});
	};
	
	

	/**
	* update which fields need to be taken into account during validation
	* @returns {undefined}
	*/
	const updateAllFieldsetValidation = () => {
		const fieldsets = Array.from(document.querySelectorAll(`[${attributes.fieldset}]`));

		fieldsets.forEach((fieldset) => {
			updateFieldsetValidation(fieldset);
		});
	};
	


	/**
	* initialize all functionality
	* @returns {undefined}
	*/
	const init = () => {
		triggers = Array.from(document.querySelectorAll(`[${attributes.trigger}]`));
		if (triggers.length) {
			initTriggers();
			updateAllFieldsetValidation();
		}
	};

	document.addEventListener('DOMContentLoaded', init);
	
})();