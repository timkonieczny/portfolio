#version 100
precision highp float;

varying vec3 vColor;
varying vec3 vNormal;
varying vec3 vPosition;
varying vec3 vAmbient;
varying vec3 vLightPosition;
uniform mat4 uView;

const vec3 lightColor = vec3(1.0, 1.0, 1.0);
const float specularStrength = 2.0;
const float shininess = 128.0;

void main() {

    // diffuse component
    vec3 lightDir = normalize(vec4(vLightPosition, 1.0) - vec4(vPosition, 1.0)).xyz;
    float diff = max(dot(vNormal, lightDir), 0.0);
    vec3 diffuse = diff * lightColor;

    // specular component
    vec3 viewDir = normalize(-vPosition);
    vec3 reflectDir = reflect(-lightDir, vNormal);  
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), shininess);
    vec3 specular = specularStrength * spec * lightColor;  

    vec3 result = (vAmbient + diffuse + specular) * vColor;

    gl_FragColor = vec4(result, 1.0);
}