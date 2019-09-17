#version 100
precision highp float;

attribute vec3 aPosition;
attribute vec3 aColor;
attribute vec3 aNormal;
attribute vec3 aCenter;
attribute float aDisplacementY0;
attribute float aDisplacementY1;
attribute float aDisplacementY2;
attribute float aDisplacementY3;
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
uniform float uDisplacementY3;
uniform float uExplosion;
uniform float uDoubleExplosion;
uniform vec3 uLightPosition;

const float pi = 3.14159;
const float waveLengthX = 0.1;
const float waveLengthZ = 0.1;
const float waveHeightX = 2.0;
const float waveHeightZ = 2.0;
const float ambientStrength = 0.1;
 
void main() {
    vec3 position = aPosition;

    position.y = position.y + (uExplosion - uDoubleExplosion) * (
        sin(uTime + aCenter.x * waveLengthX) * waveHeightX - waveHeightX
        + cos(uTime + aCenter.z * waveLengthZ) * waveHeightZ - waveHeightZ
        + uDisplacementY0 * aDisplacementY0 * 20.0
        + uDisplacementY1 * aDisplacementY1 * 20.0
        + uDisplacementY2 * aDisplacementY2 * 20.0
        + uDisplacementY3 * aDisplacementY3 * 20.0)
        + sin(uExplosion * pi) * aDisplacementY0 * 20.0
        + sin((1.0 - uDoubleExplosion) * pi) * aDisplacementY0 * 20.0;

    position.x = (1.0 - uExplosion + uDoubleExplosion) * aStartPosition.x
        + (uExplosion - uDoubleExplosion) * aPosition.x;
    position.z = (1.0 - uExplosion + uDoubleExplosion) * aStartPosition.z
        + (uExplosion - uDoubleExplosion) * aPosition.z;

    vColor = aColor;
    vPosition = (uView * vec4((uWorld * vec4(position, 1.0)).xyz, 1.0)).xyz;
    vNormal = normalize(mat3(uView) * uNormal * aNormal);
    vLightPosition = (uView * vec4(uLightPosition, 1.0)).xyz;

    // ambient component
    vec3 lightColor = vec3(1.0, 1.0, 1.0);
    vAmbient = ambientStrength * lightColor;

    gl_Position = uProjection * uView * uWorld * vec4(position, 1.0);
}