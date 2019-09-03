#version 100
precision highp float;

attribute vec3 aPosition;
attribute vec3 aColor;
attribute vec3 aNormal;
attribute vec3 aCenter;
attribute float aDisplacementY0; // TODO: rename
attribute float aDisplacementY1;
attribute float aDisplacementY2;
attribute vec3 aStartPosition;
varying vec3 vColor;
varying vec3 vNormal;
varying vec3 vPosition;
varying mat4 vView;
varying vec3 vAmbient;
varying vec3 vLightPosition;
uniform mat4 uWorld;
uniform mat4 uView;
uniform mat4 uProjection;
uniform mat3 uNormal;
uniform float uTime;
uniform float uDisplacementY0;
uniform float uDisplacementY1;
uniform float uDisplacementY2;
uniform float uExplosion;
uniform vec3 uLightPosition;

void main() {
    vec3 position = aPosition;
    float waveLengthX = 0.1;
    float waveLengthZ = 0.1;
    float waveHeightX = 2.0;
    float waveHeightZ = 2.0;

    position.y = position.y + uExplosion * (
        sin(uTime + aCenter.x * waveLengthX) * waveHeightX - waveHeightX
        + cos(uTime + aCenter.z * waveLengthZ) * waveHeightZ - waveHeightZ
        + uDisplacementY0 * aDisplacementY0 * 20.0
        + uDisplacementY1 * aDisplacementY1 * 20.0
        + uDisplacementY2 * aDisplacementY2 * 20.0);

    position.x = (1.0 - uExplosion) * aStartPosition.x
        + uExplosion * aPosition.x;
    position.z = (1.0 - uExplosion) * aStartPosition.z
        + uExplosion * aPosition.z;

    vColor = aColor;
    vPosition = (uView * vec4((uWorld * vec4(position, 1.0)).xyz, 1.0)).xyz;
    vNormal = normalize(mat3(uView) * uNormal * aNormal);
    vLightPosition = (uView * vec4(uLightPosition, 1.0)).xyz;

    // ambient component
    float ambientStrength = 0.1;
    vec3 lightColor = vec3(1.0, 1.0, 1.0);
    vAmbient = ambientStrength * lightColor;

    gl_Position = uProjection * uView * uWorld * vec4(position, 1.0);
}