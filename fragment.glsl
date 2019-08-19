precision mediump float;

varying vec3 fragColor;
varying vec3 fragNormal;
varying vec3 fragPos;

uniform vec3 lightPos;
uniform vec3 viewPos;

void main() {
    float ambientStrength = 0.1;
    float specularStrength = 0.5;
    vec3 lightColor = vec3(1.0, 1.0, 1.0);
    vec3 ambient = ambientStrength * lightColor;
    
    vec3 norm = normalize(fragNormal);
    vec3 lightDir = normalize(lightPos - fragPos);
    float diff = max(dot(norm, lightDir), 0.0);
    vec3 diffuse = diff * lightColor;

    //FragColor = vec4(result, 1.0);


    // float specularStrength = 0.5;

    vec3 viewDir = normalize(viewPos - fragPos);
    vec3 reflectDir = reflect(-lightDir, norm);  
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), 32.0);
    vec3 specular = specularStrength * spec * lightColor;  

    vec3 result = (ambient + diffuse + specular) * fragColor;

    gl_FragColor = vec4(result, 1.0);
}