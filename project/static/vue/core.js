

document.addEventListener("DOMContentLoaded", function(event) { 

// LEFT HUB =========================================================================================================//
    
    var console_ = Vue.component('base_hub_line', {
        props: {
            project: {
                type: Object,
            },
            deep: Number,
            path: {
                type: String,
                default: ''
            }
        },
        
        data: function () {
            return {
                opened: false
            }
        },
        template: `
        <div class='project w-100'>
            <div class='d-flex flex-row' @click='open' :style='{"margin-left":deep*10+"px"}'>
                <template v-if='project.isfolder == true'>
                    <img src="/static/project/img/arrow.png" class='project_arrow d-block' :class='{"project_arrow_invert":opened}'/>
                    <img src="/static/project/img/folder.png" class='project_folder d-block' />
                </template>
                <template v-else>
                    <img v-if='project.extension == "py"' src="/static/project/img/file_py.png" class='project_file d-block' />
                    <img v-if='project.extension == "txt"' src="/static/project/img/file_txt.png" class='project_file d-block' />
                </template>
                <a class='d-block flex-grow-1 base_hub_line' href='#'>{{project_name}}</a>
            </div>
            <template  v-if='project.isfolder && "content" in project'>
                    <base_hub_line v-show='opened' v-for='(item, index) in project.content' :deep='deep+1' :project='item' :path='full_path'></base_hub_line>
            </template>
        </div>`,
        mounted: function () {
            if (this.project.extension == 'py' && !(this.full_path in this.$root.py_files)) {
                this.$root.py_files[this.full_path] = this;
            } else if (this.project.extension == 'txt' && !this.$root.txt_files.includes(this.full_path)) {
                this.$root.txt_files.push(this.full_path);
            } else {
                this.$root.folders.push(this.full_path);
            }
        },
        methods: {
            open: function() {
                if (this.project.isfolder == true) {
                    this.$emit("open");
                    this.switchOpen();
                } else {
                    if (!(this.$root.opened_files_hash.includes(this.project.name))) {
                        this.$root.opened_files_hash.push(this.project.name);

                        let data = {
                            name: this.project.name,
                            data: this.project.text
                        }

                        this.$root.opened_files.push(data);
                        this.$root.selected = this.$root.opened_files.length-1;
                    }
                }
            },
            switchOpen: function() {
                if (this.opened == true) {
                    this.opened = false;
                } else {
                    this.opened = true;
                }
            },
            execute: function () {
                console.log(this.full_path + ' executed');
            }
        },
        computed: {
            project_name: function () {
                if (this.project.extension == null || this.project.extension == undefined) {
                    return this.project.name
                } else {
                    return this.project.name+'.'+this.project.extension
                }
            },
            full_path: function () {
                return this.path != '' ? this.path+"/"+this.project.name : this.project.name
            }
        }
    })

    var projects = Vue.component('projects', {
         data: function () {
            return {
                projects: [],
                loaded: false
            }
        },
        mounted: function () {
            axios.get('/projects', {
            }).then((response) => {
                var elements = []
                response.data.data.forEach(element => {
                    element.isfolder = false;
                    element.extension = 'py';
                    elements.push(element);
                })

                this.projects = {
                    name:'projects',
                    isfolder:true,
                    content: elements
                }
                this.loaded = true;

            }).catch((error) => {
              console.error(error);
            }).finally(() => {
              // TODO
            });
        },
        template: `
        <div>
            <base_hub_line v-if='loaded' name='projects' link='#' :project='projects' :deep='0'></base_hub_line>
        </div>`
    })

	var left_hub = Vue.component('left_hub', {
         data: function () {
            return {
                readme: {
                    name:'readme',
                    extension:'txt',
                    text: 'test_text',
                    isfolder: false,
                },
                portfolio: {
                    name:'portfolio',
                    extension:'py',
                    text: 'test_text',
                    isfolder: false,
                }
            }
        },
        template: `
        <div id='left_hub' class='d-flex flex-row justify-content-end'>
            <div class='flex-grow-1' id='left_hub_box'>
                <slot><span id='folder_text'>FOLDERS:</span></slot>
                <projects></projects>
                <base_hub_line :project='readme' :deep='0'></base_hub_line>
                <base_hub_line :project='portfolio' :deep='0'></base_hub_line>
            </div>
            <div id='left_hub_right_edge' ref='right_edge' @mousedown='resize'></div>
        </div>`,
        methods: {
            resize: function (event) {
                document.addEventListener('mousemove', this.resize_func);
                document.addEventListener('mouseup', e => {
                    document.removeEventListener('mousemove', this.resize_func);
                });
            },
            resize_func(event) {
                element = document.getElementById('left_hub');
                element.style.width = event.x-24+'px';
            }
        }
    })
// LEFT HUB =========================================================================================================//
//CODE_EDITOR========================================================================================================//

    var code_editor = Vue.component('code_window', {
         data: function () {
            return {
            }
        },
        template: `
        <div id='code_window' class='flex-grow-1'>
            <sub_header></sub_header>
            <div id='code_box' v-if='$root.opened_files[$root.selected] != null'>
                <code_line v-for='(line, index) in $root.opened_files[$root.selected].data' :text='line' :index='index+1'></code_line>
            </div>
        </div>`,
        computed: {
            file: function () {
                var array = this.$root.opened_files[this.$root.selected].data.split('\n')
                return array
            }
        }
    })

    var sub_header = Vue.component('sub_header', {
         data: function () {
            return {
            }
        },
        template: `
        <div id='sub-header-block' class='d-flex flex-row'> 
            <sub_header_file v-for='(file, index) in $root.opened_files' :file='file' :index='index'></sub_header_file>
        </div>
        `,
    }) 


    var sub_header_file = Vue.component('sub_header_file', {
        props: ['file', 'index'],
        data: function () {
            return {
            }
        },
        template: `
        <div class='header_block_file d-flex flex-row justify-content-end align-items-center' :class='{"header_block_file_selected":index == $root.selected}'>
            <div class='name_file_header flex-grow-1' @click='$root.selected = index'>{{file.name}}</div>
            <div class='close_file_header' ref='close' @click='delete_(index)'>x</div>
        </div>`,
        methods: {
            delete_: function (index) {
                this.$root.opened_files.splice(index, 1);
                this.$root.opened_files_hash.splice(index, 1);
                if (index == this.$root.selected) {
                    this.$root.selected = null;
                    return;
                }
                if (index < this.$root.selected) { 
                    this.$root.selected --;
                }
            }
        }
    }) 

    var code_editor_line = Vue.component('code_line', {
        props: ['text', 'index'],
         data: function () {
            return {
            }
        },
        template: `
        <div class='d-flex flex-row code_row'>
            <div style='width: 35px; height:100%; text-align:right; padding-right: 5px; margin-right:5px;'>{{index}}</div>
            <div>{{text}}</div>
        </div>`
    }) 

//CODE_EDITOR========================================================================================================//
//HEADER=============================================================================================================//
    var header = Vue.component('header_', {
         data: function () {
            return {
            }
        },
        template: `
        <div id='header'>
        
        </div>`,
    }) 

//HEADER=============================================================================================================//
//TOPPER=============================================================================================================//
    var topper = Vue.component('topper', {
        data: function () {
            return {
            }
        },
        template: `
        <div id='topper' class='d-flex flex-row justify-content-end align-items-center'>
            <img src="/static/project/img/pyLime.png" class='ml-1' style='height: 16px;' alt="" />
            <div class='flex-grow-1 pl-1 text-white-50'>PyLime editor</div>
            <div id='close_redactor_button' @click='$emit("close")'>X</div>
        </div>`,
        methods: {
        }
    }) 
//TOPPER=============================================================================================================//

//CONSOLE============================================================================================================//
    var topper = Vue.component('console', {
        data: function () {
            return {
                selected: 1,
            }
        },
        template: `
        <div id='console' class='d-flex flex-column'>
            <div id='console-block' class='flex-grow-1'>
                <template v-if='selected == 1'>
                    <terminal_console></terminal_console>
                </template>
            </div>
            <div id='console-bar' class='d-flex flex-row'>
                <terminal_bar @openTerminal='selected = 1'></terminal_bar>
            </div>
        </div>`,
        methods: {
        
        }
    })

    var topper = Vue.component('terminal_bar', {
        data: function () {
            return {
            }
        },
        template: `
        <div class='console_bar_element' @click='$emit("openTerminal")'>
            Terminal
        </div>`,
        methods: {
        
        }
    })
    var topper = Vue.component('terminal_console', {
        data: function () {
            return {
                commands: [],
                text: [],
                command: '',
                current: -1,
                focus: false
            }
        },
        template: `
        <div class='d-flex flex-column justify-content-end h-100 p-1' @click='set_focus_input'>
            <div v-for='(line, index) in text' v-html='line'></div>
            <div class='d-flex flex-row'>
                <div id='console-position'>{{path_text}}></div>
                <div id='console-text'>{{this.command}}</div> 
                <div id='console-caret' :class='{"console-caret-non-focus":!focus}'></div>
                <input ref='console_input' type="text" id='console-input' @keyup.enter="submit" v-model='command' @keyup.up="load_command_up" @keyup.down="load_command_down" @blur="focus=false" @focus='focus=true' />
            </div>
        </div>`,
        methods: {
            set_focus_input: function () {
                this.$refs.console_input.focus();
            },
            submit: function () {
                if (this.command != '' && this.command != null) {
                    this.commands.push(this.command);
                    this.handle(this.command);
                    this.command = '';
                    this.current = this.commands.length-1;
                }
            },
            load_command_up: function () {
                this.command = this.commands[this.current];
                if (this.current != 0) {
                    this.current --;
                }
            },
            load_command_down: function () {
                this.command = this.commands[this.current];
                if (this.current != this.commands.length-1) {
                    this.current ++;
                }
            },
            offFocus: function () {
                this.focus = false;
            },
            handle: function (com) {
                var com_separated = com.split(' ');
                com_separated.forEach(function (currentValue, index, array) {
                    if (currentValue == '') {
                        com_separated.splice(index, 1);
                    }
                });
                switch(com_separated[0]){
                    case 'python':
                        this.py_handler(com_separated[1]);
                        break;
                    case 'cd':
                        this.cd_handler(com_separated[1]);
                        break;
                    case 'help':
                        this.help_handler();
                        break;
                    default:
                        this.text.push(`${com_separated[0]} is not recognized as an internal or external command, operable program or batch file.`);
                        break;
                }
            },
            help_handler: function () {
                var help = [
                    'Available commands:',
                    '   cd - folders navigation',
                    '   python - execute python scripts'
                ]
            },
            py_handler: function (comm) {
                var path = '';
                pathStr = '';

                // create current path str
                this.$root.path.forEach(element => {
                    if (pathStr != '') {
                        pathStr = pathStr + '/' + element;
                    } else {
                        pathStr = element;
                    }
                });

                //remove extension
                if (comm.includes('.py')) {
                    comm = comm.slice(0, comm.indexOf('.py'));
                }

                // create full path
                if (pathStr.length == 0) {
                    path = comm;
                } else {
                    path = pathStr+ '/' + comm;
                }

                if (!(path in this.$root.py_files)) {
                    this.text.push(`python: can't open file '${comm}.py': [Errno 2] No such file or directory.`);
                    return;
                }

                this.$root.py_files[path].execute();

            },

            cd_handler: function (comm) {
                if (comm == '..') {
                    if (this.$root.path.length == 0) {
                        this.text.push('<div class="console-error-line">You don\'t have permission to move in the parent catalog.</div>')
                        return;
                    }
                    this.$root.path.pop();
                    return;
                } 
                pathStr = '';
                this.$root.path.forEach(element => {
                    if (pathStr != '') {
                        pathStr = pathStr + '/' + element;
                    } else {
                        pathStr = element;
                    }
                })
                var path = '';
                if (pathStr.length == 0) {
                    path = comm;
                } else {
                    path = pathStr+ '/' + comm;
                }
                if (comm == undefined) {
                    this.text.push(this.$root.core_path+'/'+pathStr);
                    return;
                }
                if (this.$root.folders.includes(path)) {
                    comm.split('/').forEach(element => {
                        this.$root.path.push(element);
                    });
                } else {
                    this.text.push('The system cannot find the path specified.');
                }
            }
        },
        computed: {
            path_text: function () {
                return this.$root.core_path + '/' + this.$root.path.join('/')
            }
        }
    }) 

//CONSOLE============================================================================================================//

	var main = Vue.component('main_', {
         data: function () {
            return {
                open: true,
            }
        },
        template: `
        <div v-if='open' class='d-flex flex-column' id='redactor_container'>
        	<topper @close='open=false'></topper>
        	<div id='core_body' class='flex-grow-1 d-flex flex-row'>
            	<left_hub></left_hub>
				<code_window></code_window>
			</div>
            <console></console>
        </div>`
    })

    var app = new Vue({
        el: '#app',
        data: {
            opened_files: [],
            opened_files_hash: [],
            selected: null,
            py_files: {},
            txt_files: [],
            folders: [],
            core_path: "D:/Projects/Portfolio",
            path: [],
        }
    })

});