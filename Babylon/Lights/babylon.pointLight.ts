﻿module BABYLON {
    export class PointLight extends Light {
        public diffuse = new Color3(1.0, 1.0, 1.0);
        public specular = new Color3(1.0, 1.0, 1.0);

        private _worldMatrix: Matrix;
        private _transformedPosition: Vector3;

        //ANY
        constructor(name: string, public position: Vector3, scene) {
            super(name, scene);
        }

        //ANY
        public transferToEffect(effect, positionUniformName: string): void {
            if (this.parent && this.parent.getWorldMatrix) {
                if (!this._transformedPosition) {
                    this._transformedPosition = BABYLON.Vector3.Zero();
                }

                BABYLON.Vector3.TransformCoordinatesToRef(this.position, this.parent.getWorldMatrix(), this._transformedPosition);
                effect.setFloat4(positionUniformName, this._transformedPosition.x, this._transformedPosition.y, this._transformedPosition.z, 0);

                return;
            }

            effect.setFloat4(positionUniformName, this.position.x, this.position.y, this.position.z, 0);
        }

        //ANY
        public getShadowGenerator() {
            return null;
        }

        public _getWorldMatrix(): Matrix {
            if (!this._worldMatrix) {
                this._worldMatrix = BABYLON.Matrix.Identity();
            }

            Matrix.TranslationToRef(this.position.x, this.position.y, this.position.z, this._worldMatrix);

            return this._worldMatrix;
        }
    }
} 