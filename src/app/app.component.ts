import {Component} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';

interface RadioValue {
  label: string;
  value: boolean | string;
}

interface ConstructorField {
  label: string;
  values: RadioValue[];
  disabled?: boolean;
  default?: boolean | string;
}

const openVINOInstalledField: ConstructorField = {
  label: 'I have OpenVINO installed',
  values: [{label: 'Yes', value: true}, {label: 'No', value: false}],
  default: true
};

const dockerInstalledField: ConstructorField = {
  label: 'I have Docker installed',
  values: [{label: 'Yes', value: true}, {label: 'No', value: false}],
  default: true
};

const machineOsField: ConstructorField = {
  label: 'My OS',
  values: [{label: 'Linux', value: 'Linux'}, {label: 'Windows', value: 'Windows'}, {label: 'Ubuntu', value: 'Ubuntu'}],
  default: 'Linux'
};

const availableDevices: ConstructorField = {
  label: 'Accelerators on my machine',
  values: [{label: 'CPU', value: 'CPU'}, {label: 'GPU', value: 'GPU'}, {label: 'NCS2', value: 'NCS2'}, {
    label: 'HDDL',
    value: 'HDDL'
  }],
  default: 'CPU'
};

const startWithField: ConstructorField = {
  label: 'Start DL Workbench with',
  values: [{label: 'Python wrapper', value: 'pip'}, {label: 'Plain Docker Command', value: 'docker'}],
  default: 'pip'
};

const useHttpProxy: ConstructorField = {
  label: 'Use HTTP Proxy',
  values: [{label: 'Yes', value: true}, {label: 'No', value: false}],
  default: false
};

const useHttpsProxy: ConstructorField = {
  label: 'Use HTTPS Proxy',
  values: [{label: 'Yes', value: true}, {label: 'No', value: false}],
  default: false
};

const useNoProxy: ConstructorField = {
  label: 'Use No Proxy',
  values: [{label: 'Yes', value: true}, {label: 'No', value: false}],
  default: false
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'wb-launch-constructor';
  public launchConstructorForm: FormGroup;
  public openVINOInstalledField = openVINOInstalledField;
  public dockerInstalledField = dockerInstalledField;
  public machineOsField = machineOsField;
  public availableDevices = availableDevices;
  public startWithField = startWithField;
  public useHttpProxy = useHttpProxy;
  public useHttpsProxy = useHttpsProxy;
  public useNoProxy = useNoProxy;

  constructor(private formBuilder: FormBuilder) {
    this.launchConstructorForm = this.formBuilder.group({
      openVINOInstalled: [this.openVINOInstalledField.default, Validators.required],
      dockerInstalled: [this.dockerInstalledField.default, Validators.required],
      machineOS: [this.machineOsField.default, Validators.required],
      devices: [[this.availableDevices.default], Validators.required],
      wbLauncher: [this.startWithField.default, Validators.required],
      httpProxy: [this.useHttpProxy.default, Validators.required],
      httpsProxy: [this.useHttpsProxy.default, Validators.required],
      noProxy: [this.useNoProxy.default, Validators.required],
    });
  }

  isOptionSelected(controlName: string, optionValue: boolean | string): boolean {
    return this.launchConstructorForm.get(controlName)?.value === optionValue;
  }

  isDeviceSelected(optionValue: boolean | string): boolean {
    return this.launchConstructorForm.get('devices')?.value.includes(optionValue);
  }

  deviceSelected(optionValue: boolean | string): void {
    const selectedDevices = this.launchConstructorForm.get('devices')?.value;
    if (selectedDevices.includes(optionValue)) {
      const index = selectedDevices.indexOf(optionValue, 0);
      if (index > -1) {
        selectedDevices.splice(index, 1);
      }
    } else {
      selectedDevices.push(optionValue);
    }
    this.launchConstructorForm.get('devices')?.patchValue(selectedDevices);

  }

  get useHttpProxyControl(): AbstractControl | null {
    return this.launchConstructorForm.get('httpProxy');
  }

  get useHttpsProxyControl(): AbstractControl | null {
    return this.launchConstructorForm.get('httpsProxy');
  }

  get useNoProxyControl(): AbstractControl | null {
    return this.launchConstructorForm.get('noProxy');
  }
}
