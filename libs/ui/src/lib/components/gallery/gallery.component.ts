import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'ui-gallery',
    templateUrl: './gallery.component.html',
    styles: []
})
export class GalleryComponent implements OnInit {
    sizeImagesExample = 'https://via.placeholder.com/500x500';
    selectedImageUrl = '';
    @Input() images: string[] = [];

    ngOnInit(): void {
        if (this.hasImages) {
            this.selectedImageUrl = this.images[0];
        }
    }

    changeSelectedImage(imageUrl: string) {
        this.selectedImageUrl = imageUrl;
    }

    get hasImages() {
      return this.images?.length > 0;
    }
}
