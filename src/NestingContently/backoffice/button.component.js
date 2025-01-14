(() => {
    'use strict';

    function controller($element, $scope, locale) {

        let prop = {};
        let labels = {};
        let disabled = false;

        locale.localizeMany(['actions_enable','actions_disable']).then(data => {
            labels.enable = data[0];
            labels.disable = data[1];
        });

        const disabledClass = 'umb-nested-content__item--disabled';
        const itemClass = '.umb-nested-content__item';
        const editorName = 'NestingContently';

        const setClass = fn => $element.closest(itemClass)[0].classList[fn](disabledClass);
        const setTitle = () => this.iconTitle = disabled ? labels.enable :labels.disable;
        
        this.disabledClass = () => disabled ? elementClass : '';
        
        this.toggle = () => {
            disabled = !disabled;
            
            prop.value = disabled ? 1 : 0;

            this.parent.model.value[this.index].disabled = disabled;
            this.parent.$parent.$parent.model.value[this.index].disabled = disabled;
         
            setTitle();
            setClass('toggle');
        }

        this.$onInit = () => {
            if (this.node) {                
                const props = this.node.variants[0].tabs[0]
                    .properties.filter(p => p.editor === editorName);

                if (props.length === 1) {
                    prop = props[0];
                    disabled = +prop.value === 1;

                    setTitle();
                    
                    if (disabled) {
                        setClass('add');
                    }
                } else {
                    $element[0].style.display = 'none';
                }
            }
        };
    }
 
    const template = `
        <a class="umb-nested-content__icon umb-nested-content__icon--disable" 
            title="{{ $ctrl.iconTitle }}" 
            ng-click="$ctrl.toggle(); $event.stopPropagation()" 
            ng-class="$ctrl.disabledClass()" prevent-default>
            <i class="icon icon-power"></i>
        </a>`;

    const component = {
        transclude: true,
        bindings: {
            node: '<',
            index: '<',
            parent: '<'
        },
        controller: controller,
        template: template
    };

    controller.$inject = ['$element', '$scope', 'localizationService'];

    angular.module('umbraco.directives').component('ncToggle', component);
})();
