#version 100
precision mediump float;

attribute vec3 vertPosition;
attribute vec3 vertColor;
attribute vec3 vertNormal;
varying vec3 fragColor;
varying vec3 fragNormal;
varying vec3 fragPos;
uniform mat4 mWorld;
uniform mat4 mView;
uniform mat4 mProj;

uniform mat3 mNorm;

void main() {
    fragColor = vertColor;

    // Normal = mat3(transpose(inverse(model))) * aNormal;

    // mat4 mWorldInverse = inverse(mWorld);
    // mat4 mWorldInverseTranspose = transpose(mWorldInverse);
    // mat3 mWorldInverseTranspose3x3 = mat3(mWorldInverseTranspose);
    // fragNormal = mWorldInverseTranspose3x3 * vertNormal;

    // fragNormal = mat3(transpose(inverse(mWorld))) * vertNormal;

    fragNormal = mNorm * vertNormal;

    fragPos = (mWorld * vec4(vertPosition, 1.0)).xyz;
    gl_Position = mProj * mView * mWorld * vec4(vertPosition, 1.0);
}