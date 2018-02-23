import { Website } from '../models/website.model.client';
import {Injectable} from '@angular/core';
import {WEBSITES} from './website.mock';


@Injectable()
export class WebsiteService {

    websites: Website[] = WEBSITES;

  createWebsite(userId: String, website: Website) {
    this.websites.push(new Website(website._id, website.name, userId, website.description));
  }

  findWebsitesByUser(userId: String) {
    const resultSet = [];
    for ( const i in this.websites) {
      if (this.websites[i].developerId === userId) {
        resultSet.push(this.websites[i]);
      }
    }
    return resultSet;
  }

  findWebsitesById(websiteId: String) {
    return this.websites.find(function (website) {
      return website._id === websiteId;
    });
  }

  updateWebsite(websiteId: String, website: Website) {
    for ( const i in this.websites) {
      if (this.websites[i]._id === websiteId) {
        this.websites[i].name = website.name;
        this.websites[i].description = website.description;
        return this.websites[i];
      }
    }
  }

  deleteWebsite(websiteId: String) {
    for (let i = 0; i < this.websites.length; i++) {
      if (this.websites[i]._id === websiteId) {
        this.websites.splice(i, 1);
        i = this.websites.length;
      }
    }
  }
}
