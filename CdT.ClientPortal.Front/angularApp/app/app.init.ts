import { EntityManagerService } from './entity-manager.service';
import { NamingConvention } from 'breeze-client';


export function onAppInit(_entityManagerService: EntityManagerService) {
    return () => _entityManagerService.initialize();
}
