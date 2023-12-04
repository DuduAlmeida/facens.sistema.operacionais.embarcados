import { Injectable } from '@nestjs/common';
import { Package } from 'src/contracts/package/package.interface';
import { FindAllProps } from './contracts';

@Injectable()
export class PackagesService {
  private packages: Package[] = [];

  create(package_added: Package): Package {
    const newPackage: Package = { ...package_added };
    this.packages.push(newPackage);
    return newPackage;
  }

  findAll({ cpf }: FindAllProps): Package[] {
    const filteredPackages: Package[] = [...this.packages];

    const getByCpf = (item) => item?.cpf === cpf;

    return filteredPackages.filter(getByCpf);
  }

  findOne(id: string): Package {
    return this.packages.find((item) => item.id === id);
  }

  delete(id: string): Package {
    const index = this.packages.findIndex((item) => item.id === id);
    if (index >= 0) {
      const deletedPackage = this.packages[index];
      this.packages.splice(index, 1);
      return deletedPackage;
    }

    return null;
  }
}
