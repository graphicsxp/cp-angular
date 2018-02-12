import { EntityManagerService } from './entity-manager.service';
import { NamingConvention } from 'breeze-client';
import { RegistrationHelper } from './model/breeze/registration-helper';


export function onAppInit(_registrationHelper: RegistrationHelper, _entityManagerService: EntityManagerService) {
    return () => {
        return _entityManagerService.initialize().then(
            (res) =>
        _registrationHelper.register(_entityManagerService.em.metadataStore));
    }
}
